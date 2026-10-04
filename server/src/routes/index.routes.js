import { Router } from "express";
import healthRoutes from "./health.routes.js";
import ttsRoutes from "./tts.routes.js";
import voicesRoutes from "./voices.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/voices", voicesRoutes);
router.use("/tts", ttsRoutes);

export default router;