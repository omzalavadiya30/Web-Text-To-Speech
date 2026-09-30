import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV;
export const CLIENT_URL = process.env.CLIENT_URL;
export const MONGODB_URI = process.env.MONGODB_URI;
export const TTS_API_KEY = process.env.TTS_API_KEY;
export const TTS_REGION = process.env.TTS_REGION;
export const TTS_ENDPOINT = process.env.TTS_ENDPOINT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;