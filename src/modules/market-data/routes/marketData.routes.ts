import { Router } from "express";

import { authenticate } from "../../../middleware/auth.middleware";

import { PrismaBrokerRepository } from "../../brokers/repositories/PrismaBrokerRepository";
import { BrokerService } from "../../brokers/services/BrokerService";

import { MarketDataController } from "../controllers/MarketDataController";
import { MarketDataService } from "../services/MarketDataService";

const router = Router();

const brokerRepository = new PrismaBrokerRepository();
const brokerService = new BrokerService(brokerRepository);

const marketDataService = new MarketDataService();

const controller = new MarketDataController(
  brokerService,
  marketDataService
);

router.get(
  "/historical/:brokerId",
  authenticate,
  controller.getHistoricalCandles.bind(controller)
);

router.post(
  "/quote/:brokerId",
  authenticate,
  controller.getLiveQuote.bind(controller)
);

router.get(
  "/option-chain/:brokerId",
  authenticate,
  controller.getOptionChain.bind(controller)
);

export default router;