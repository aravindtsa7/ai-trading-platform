import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import { BadRequestError } from "../common/exceptions/BadRequestError";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(
        new BadRequestError(
          errors.map((error) => error.message).join(", ")
        )
      );
    }

    req.body = result.data;

    next();
  };