import { Router } from "express";

import { authenticate } from "../../../middleware/auth.middleware";
import { validate } from "../../../middleware/validation.middleware";

import { BrokerController } from "../controllers/BrokerController";
import { BrokerService } from "../services/BrokerService";
import { PrismaBrokerRepository } from "../repositories/PrismaBrokerRepository";

import {
  createBrokerSchema,
  updateBrokerSchema,
} from "../validators";

const router = Router();

const repository = new PrismaBrokerRepository();
const service = new BrokerService(repository);
const controller = new BrokerController(service);

router.post(
  "/",
  authenticate,
  validate(createBrokerSchema),
  controller.create.bind(controller)
);

router.get(
  "/",
  authenticate,
  controller.getAll.bind(controller)
);

router.get(
  "/:id",
  authenticate,
  controller.getById.bind(controller)
);

router.put(
  "/:id",
  authenticate,
  validate(updateBrokerSchema),
  controller.update.bind(controller)
);

router.delete(
  "/:id",
  authenticate,
  controller.delete.bind(controller)
);

export default router;