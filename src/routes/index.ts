import { Router } from "express";

import healthRoutes from "./health.routes";
import testRoutes from "./test.routes";

const router = Router();

router.use(healthRoutes);
router.use(testRoutes);

export default router;