import { Router } from "express";
import { ApiResponse } from "../common/responses";

const router = Router();

router.get("/health", (_req, res) => {
    ApiResponse.success(res, {
        message: "AI Trading Platform API is running",
        data: {
            version: "1.0.0",
        },
    });
});

export default router;