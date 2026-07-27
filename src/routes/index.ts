import { Router } from "express";
import authRoutes from "../modules/auth/routes/auth.routes";
import brokerRoutes from "../modules/brokers/routes/broker.routes";
import upstoxRoutes from "../modules/brokers/upstox/routes";
import marketDataRoutes from "../modules/market-data/routes/marketData.routes";
import healthRoutes from "./health.routes";
import testRoutes from "./test.routes";

const router = Router();

router.use(healthRoutes);
router.use(testRoutes);

router.use("/auth", authRoutes);
router.use("/brokers", brokerRoutes);
router.use("/upstox", upstoxRoutes);
router.use("/market-data", marketDataRoutes);

export default router;