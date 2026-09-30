export const handleTtsRequest = (req, res) => {
  const { text, language, voice, speed, pitch } = req.body ?? {};

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

  if (speed !== undefined && (typeof speed !== "number" || !Number.isFinite(speed))) {
    return res.status(400).json({ success: false, message: "Speed must be a number" });
  }

  if (pitch !== undefined && (typeof pitch !== "number" || !Number.isFinite(pitch))) {
    return res.status(400).json({ success: false, message: "Pitch must be a number" });
  }

  const data = { text, language, voice };
  if (speed !== undefined) data.speed = speed;
  if (pitch !== undefined) data.pitch = pitch;

  return res.status(200).json({
    success: true,
    message: "TTS request validated successfully",
    data,
  });
};