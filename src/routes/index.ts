import { Router } from "express";
import authRoutes from "../modules/auth/routes/auth.routes";
import healthRoutes from "./health.routes";
import testRoutes from "./test.routes";

const router = Router();

router.use(healthRoutes);
router.use(testRoutes);
router.use("/auth", authRoutes);

export default router;