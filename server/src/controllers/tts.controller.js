export const handleTtsRequest = (req, res) => {
  const { text, language, voice, speed, pitch } = req.body ?? {};

  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ success: false, message: "Text is required" });
  } else if (typeof language !== "string" || !language.trim()) {
    return res.status(400).json({ success: false, message: "Language is required" });
  } else if (typeof voice !== "string" || !voice.trim()) {
    return res.status(400).json({ success: false, message: "Voice is required" });
  } else if (typeof speed !== "number" || !Number.isFinite(speed)) {
    return res.status(400).json({ success: false, message: "Speed must be a number" });
  } else if (typeof pitch !== "number" || !Number.isFinite(pitch)) {
    return res.status(400).json({ success: false, message: "Pitch must be a number" });
  }

  return res.status(200).json({
    success: true,
    message: "TTS request received successfully",
    data: { text, language, voice, speed, pitch },
  });
};