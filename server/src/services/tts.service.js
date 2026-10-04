import { createWriteStream } from "node:fs";
import { mkdir, stat, unlink } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { join } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

import { AUDIO_DIRECTORY, getElevenLabsClient } from "../config/elevenlabs.js";
import { BACKEND_URL } from "../config/env.js";

const VOICE_CACHE_DURATION_MS = 60_000;
const LANGUAGE_NAME_CODES = {
  english: "en",
  hindi: "hi",
  gujarati: "gu",
  marathi: "mr",
  spanish: "es",
  french: "fr",
  german: "de",
};

let cachedVoices = null;
let voiceCacheExpiresAt = 0;
let voiceRequest;

export const normalizeLanguageCode = (language) => {
  if (typeof language !== "string" || !language.trim()) return "";

  const baseCode = language.trim().toLowerCase().replaceAll("_", "-").split("-")[0];
  return LANGUAGE_NAME_CODES[baseCode] || baseCode;
};

const toProviderError = (error, defaultMessage) => {
  if (error.publicMessage) return error;

  const statusCode = Number(error.statusCode || error.status);
  const providerError = new Error(defaultMessage);
  providerError.publicMessage = defaultMessage;

  if (statusCode === 401 || statusCode === 403) {
    providerError.statusCode = 502;
    providerError.publicMessage = "ElevenLabs authentication or permissions are insufficient.";
  } else if (statusCode === 429) {
    providerError.statusCode = 429;
    providerError.publicMessage = "ElevenLabs is rate limiting requests. Please try again later.";
  } else if (statusCode === 404) {
    providerError.statusCode = 502;
    providerError.publicMessage = "The selected voice is no longer available.";
  } else {
    providerError.statusCode = 502;
  }

  return providerError;
};

const mapVoice = (voice) => {
  const labels = voice.labels || {};
  const verifiedLanguages = voice.verifiedLanguages || [];
  const languageCodes = [...new Set([
    ...verifiedLanguages.map((item) => normalizeLanguageCode(item.language)),
    normalizeLanguageCode(labels.language),
  ].filter(Boolean))];
  const name = voice.name || "ElevenLabs voice";
  const gender = labels.gender || "";
  const accent = verifiedLanguages.find((item) => item.accent)?.accent || labels.accent || "";
  const metadata = [gender, accent].filter(Boolean).join(" - ");

  return {
    id: voice.voiceId,
    name,
    label: metadata ? `${name} - ${metadata}` : name,
    language: languageCodes[0] || "",
    languages: languageCodes,
    gender,
    accent,
  };
};

const fetchVoices = async () => {
  const client = getElevenLabsClient();
  const voices = [];
  const seenTokens = new Set();
  let nextPageToken;

  do {
    const page = await client.voices.search({
      pageSize: 100,
      ...(nextPageToken ? { nextPageToken } : {}),
    });
    voices.push(...page.voices);

    if (!page.hasMore || !page.nextPageToken || seenTokens.has(page.nextPageToken)) break;
    seenTokens.add(page.nextPageToken);
    nextPageToken = page.nextPageToken;
  } while (true);

  return voices.map(mapVoice).filter((voice) => voice.id);
};

export const getVoices = async ({ refresh = false } = {}) => {
  if (!refresh && cachedVoices && Date.now() < voiceCacheExpiresAt) {
    return cachedVoices;
  }

  if (!refresh && voiceRequest) return voiceRequest;

  voiceRequest = fetchVoices()
    .then((voices) => {
      cachedVoices = voices;
      voiceCacheExpiresAt = Date.now() + VOICE_CACHE_DURATION_MS;
      return voices;
    })
    .catch((error) => {
      throw toProviderError(error, "Unable to load ElevenLabs voices.");
    })
    .finally(() => {
      voiceRequest = null;
    });

  return voiceRequest;
};

export const generateSpeech = async ({ text, voiceId, speed }) => {
  let audioStream;

  try {
    const client = getElevenLabsClient();
    audioStream = await client.textToSpeech.convert(voiceId, {
      text,
      modelId: "eleven_v3",
      outputFormat: "mp3_44100_128",
      voiceSettings: {
        speed: Math.min(1.2, Math.max(0.7, speed ?? 1)),
      },
    });
  } catch (error) {
    throw toProviderError(error, "Unable to generate speech with ElevenLabs.");
  }

  const filename = `${randomUUID()}.mp3`;
  const filePath = join(AUDIO_DIRECTORY, filename);

  try {
    await mkdir(AUDIO_DIRECTORY, { recursive: true });
    await pipeline(Readable.fromWeb(audioStream), createWriteStream(filePath, { flags: "wx" }));

    const audioFile = await stat(filePath);
    if (audioFile.size === 0) {
      throw new Error("ElevenLabs returned empty audio data.");
    }
  } catch {
    await unlink(filePath).catch(() => {});
    const error = new Error("Unable to save generated audio.");
    error.statusCode = 500;
    error.publicMessage = error.message;
    throw error;
  }

  return {
    audioUrl: new URL(`/audio/${filename}`, BACKEND_URL).toString(),
  };
};