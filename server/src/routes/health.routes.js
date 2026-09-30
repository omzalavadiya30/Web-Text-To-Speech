import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Web TTS API is running",
  });
});

export default router;