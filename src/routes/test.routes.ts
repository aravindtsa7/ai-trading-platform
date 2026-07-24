import { Router } from "express";
import { AppError } from "../common/exceptions";
import { asyncHandler } from "../common/helpers";

const router = Router();

router.get(
  "/error",
  asyncHandler(async (_req, _res) => {
    throw new AppError("This is a test error", 400);
  })
);

export default router;