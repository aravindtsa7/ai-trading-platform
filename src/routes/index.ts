import { Router } from "express";
import authRoutes from "../modules/auth/routes/auth.routes";
import brokerRoutes from "../modules/brokers/routes/broker.routes";
import healthRoutes from "./health.routes";
import testRoutes from "./test.routes";

const router = Router();

router.use(healthRoutes);
router.use(testRoutes);
router.use("/auth", authRoutes);
router.use("/brokers", brokerRoutes);

export default router;