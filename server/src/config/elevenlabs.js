import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { resolve } from "node:path";

import { TTS_API_KEY, TTS_ENDPOINT } from "./env.js";

let client;

const getApiBaseUrl = () => {
  if (!TTS_ENDPOINT) return undefined;
  return TTS_ENDPOINT.replace(/\/v1\/text-to-speech\/?$/, "");
};

export const getElevenLabsClient = () => {
  if (!TTS_API_KEY) {
    const error = new Error("ElevenLabs API key is not configured.");
    error.statusCode = 503;
    error.publicMessage = error.message;
    throw error;
  }

  if (!client) {
    const baseUrl = getApiBaseUrl();
    client = new ElevenLabsClient({
      apiKey: TTS_API_KEY,
      ...(baseUrl ? { baseUrl } : {}),
    });
  }

  return client;
};

export const AUDIO_DIRECTORY = resolve(process.cwd(), "audio");