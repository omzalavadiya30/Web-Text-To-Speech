import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.routes.js";
import { errorMiddleware, notFoundMiddleware } from "./middleware/error.middleware.js";
import { CLIENT_URL } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
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