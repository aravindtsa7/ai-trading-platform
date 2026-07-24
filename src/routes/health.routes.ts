import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Trading Platform API is running",
    version: "1.0.0",
  });
});

export default router;