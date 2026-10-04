import { Router } from "express";
import { listVoices } from "../controllers/tts.controller.js";

const router = Router();

router.get("/", listVoices);

export default router;