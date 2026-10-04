import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { resolve } from "node:path";

import routes from "./routes/index.routes.js";
import { errorMiddleware, notFoundMiddleware } from "./middleware/error.middleware.js";
import { CLIENT_URL } from "./config/env.js";

const app = express();
const audioDirectory = resolve(process.cwd(), "audio");
const allowedOrigins = Array.from(new Set([CLIENT_URL, "http://localhost:3000"].filter(Boolean)));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS policy rejected this origin."));
    },
  })
);

app.use(helmet());

app.use(express.json({ limit: "1mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

app.use(morgan("dev"));
app.use("/audio", (req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
}, express.static(audioDirectory, { dotfiles: "deny", index: false }));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to Text-to-Speech API",
  });
});

app.use("/api", routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;