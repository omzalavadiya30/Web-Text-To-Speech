import mongoose from "mongoose";

const speechSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    voice: {
      type: String,
      required: true,
      trim: true,
    },
    speed: {
      type: Number,
      required: true,
      default: 1,
    },
    audioUrl: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: String,
      required: true,
      default: "elevenlabs",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "speeches",
  }
);

export const Speech = mongoose.models.Speech || mongoose.model("Speech", speechSchema);
