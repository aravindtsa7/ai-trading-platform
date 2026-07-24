import { NextFunction, Request, Response } from "express";
import { AppError } from "../common/exceptions";
import { logger } from "../logger";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(
  `[ERROR] ${req.method} ${req.originalUrl} - ${error.message}`,
  {
    stack: error.stack,
  }
);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};