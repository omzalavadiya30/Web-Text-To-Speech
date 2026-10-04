import mongoose from "mongoose";
import { MONGODB_URI } from "./env.js";

export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully.");
    return connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error?.message || "Unknown MongoDB error");
    throw error;
  }
};