import { Response } from "express";

interface SuccessResponse<T = unknown> {
  message: string;
  data?: T;
  statusCode?: number;
}

interface ErrorResponse {
  message: string;
  statusCode?: number;
  errors?: unknown;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    { message, data, statusCode = 200 }: SuccessResponse<T>
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    { message, statusCode = 500, errors }: ErrorResponse
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}