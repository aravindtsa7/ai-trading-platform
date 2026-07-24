import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/AuthService";
import { PrismaAuthRepository } from "../../../infrastructure/prisma/repositories/PrismaAuthRepository";

const router = Router();

const repository = new PrismaAuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

router.post("/register", controller.register);

export default router;