import { NODE_ENV } from "../config/env.js";

export const notFoundMiddleware = (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorMiddleware = (error, req, res, next) => {
  if (NODE_ENV !== "production") {
    console.error(error);
  }

  const statusCode = error.statusCode || error.status || 500;
  const message = NODE_ENV === "production" ? "Something went wrong" : error.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};