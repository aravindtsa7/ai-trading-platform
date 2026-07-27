import { Router } from "express";

import { authenticate } from "../../../../middleware/auth.middleware";

import { PrismaBrokerRepository } from "../../repositories/PrismaBrokerRepository";
import { BrokerService } from "../../services/BrokerService";

import { UpstoxController } from "../controllers/UpstoxController";
import { UpstoxService } from "../services/UpstoxService";

const router = Router();

/**
 * Repository
 */
const brokerRepository = new PrismaBrokerRepository();

/**
 * Services
 */
const brokerService = new BrokerService(brokerRepository);
const upstoxService = new UpstoxService();

/**
 * Controller
 */
const controller = new UpstoxController(
    upstoxService,
    brokerService
);

/**
 * Routes
 */
router.get(
    "/login/:brokerId",
    controller.login.bind(controller)
);

router.get(
    "/callback",
    controller.callback.bind(controller)
);

router.get(
    "/profile/:brokerId",
    authenticate,
    controller.getProfile.bind(controller)
);

export default router;