import { generateSpeech, getVoices, normalizeLanguageCode } from "../services/tts.service.js";

export const listVoices = async (req, res, next) => {
  try {
    const voices = await getVoices();
    return res.status(200).json({ success: true, voices });
  } catch (error) {
    return next(error);
  }
};

export const handleTtsRequest = async (req, res, next) => {
  const { text, language, voice, speed } = req.body ?? {};

  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ success: false, message: "Text is required" });
  }

  if (text.length > 5000) {
    return res.status(400).json({ success: false, message: "Text must be 5000 characters or fewer" });
  }

  if (typeof language !== "string" || !language.trim()) {
    return res.status(400).json({ success: false, message: "Language is required" });
  }

  if (typeof voice !== "string" || !voice.trim()) {
    return res.status(400).json({ success: false, message: "Voice is required" });
  }

  if (speed !== undefined && (typeof speed !== "number" || !Number.isFinite(speed) || speed < 0.7 || speed > 1.2)) {
    return res.status(400).json({ success: false, message: "Speed must be between 0.7 and 1.2" });
  }

  try {
    const voices = await getVoices();
    const selectedVoice = voices.find((item) => item.id === voice);

    if (!selectedVoice || !selectedVoice.languages.includes(normalizeLanguageCode(language))) {
      return res.status(400).json({
        success: false,
        message: "Selected voice is not available",
      });
    }

    const { audioUrl } = await generateSpeech({ text, voiceId: voice, speed });

    return res.status(200).json({
      success: true,
      message: "Speech generated successfully",
      audioUrl,
    });
  } catch (error) {
    return next(error);
  }
};