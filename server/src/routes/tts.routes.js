import { Router } from "express";
import { handleTtsRequest } from "../controllers/tts.controller.js";

const router = Router();

router.post("/", handleTtsRequest);

export default router;