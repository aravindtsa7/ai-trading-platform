import { PrismaClient, Instrument } from "@prisma/client";

import {
  IInstrumentRepository,
  CreateInstrumentData,
} from "../interfaces/IInstrumentRepository";

const prisma = new PrismaClient();

export class PrismaInstrumentRepository
  implements IInstrumentRepository
{
  async createMany(
    instruments: CreateInstrumentData[]
  ): Promise<void> {
    await prisma.instrument.createMany({
      data: instruments,
      skipDuplicates: true,
    });
  }

  async deleteAll(): Promise<void> {
    await prisma.instrument.deleteMany();
  }

  async search(
    query: string
  ): Promise<Instrument[]> {
    return prisma.instrument.findMany({
      where: {
        OR: [
          {
            tradingSymbol: {
              contains: query,
            },
          },
          {
            name: {
              contains: query,
            },
          },
        ],
      },
      take: 50,
    });
  }

  async findByInstrumentKey(
    instrumentKey: string
  ): Promise<Instrument | null> {
    return prisma.instrument.findUnique({
      where: {
        instrumentKey,
      },
    });
  }
}