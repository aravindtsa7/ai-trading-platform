import { Router } from "express";
import { AppError } from "../common/exceptions";

const router = Router();

router.get("/error", () => {
  throw new AppError("This is a test error", 400);
});

export default router;