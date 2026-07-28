import { Router } from "express";

import { InstrumentController } from "../controllers/InstrumentController";
import { InstrumentService } from "../services/InstrumentService";
import { PrismaInstrumentRepository } from "../repositories/PrismaInstrumentRepository";

const router = Router();

const repository = new PrismaInstrumentRepository();
const service = new InstrumentService(repository);


export default router;