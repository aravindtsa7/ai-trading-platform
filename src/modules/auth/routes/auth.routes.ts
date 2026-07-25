import { Router } from "express";

import { validate } from "../../../middleware/validation.middleware";
import { authenticate } from "../../../middleware/auth.middleware";

import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validators/auth.validator";

import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/AuthService";

import { PrismaAuthRepository } from "../../../infrastructure/prisma/repositories/PrismaAuthRepository";

const router = Router();

const repository = new PrismaAuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

router.post(
  "/register",
  validate(registerSchema),
  controller.register
);

router.post(
  "/login",
  validate(loginSchema),
  controller.login
);

router.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  controller.refreshToken
);

router.get(
  "/me",
  authenticate,
  controller.me
);

export default router;