import { Broker, BrokerCredential, Prisma } from "@prisma/client";
import { prisma } from "../../../database/prisma";
import {
    IBrokerRepository,
    CreateBrokerData,
    CreateBrokerCredentialData,
} from "../interfaces/IBrokerRepository";
import { encrypt, decrypt } from "../../../common/crypto";

export class PrismaBrokerRepository implements IBrokerRepository {
    async createBroker(data: CreateBrokerData): Promise<Broker> {
        return prisma.broker.create({
            data: {
                userId: data.userId,
                brokerType: data.brokerType as Prisma.EnumBrokerTypeFieldUpdateOperationsInput["set"] extends never
                    ? never
                    : any,
                displayName: data.displayName,
                isDefault: data.isDefault ?? false,
            },
        });
    }

    async findBrokerById(
        id: string,
        userId: string
    ): Promise<Broker | null> {
        return prisma.broker.findFirst({
            where: {
                id,
                userId,
            },
        });
    }

    async findUserBrokers(userId: string): Promise<Broker[]> {
        return prisma.broker.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async updateBroker(
        id: string,
        userId: string,
        data: Partial<CreateBrokerData>
    ): Promise<Broker> {

        const broker = await prisma.broker.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!broker) {
            throw new Error("Broker not found.");
        }

        return prisma.broker.update({
            where: {
                id,
            },
            data: {
                displayName: data.displayName,
                isDefault: data.isDefault,
            },
        });
    }

    async deleteBroker(
        id: string,
        userId: string
    ): Promise<void> {

        const broker = await prisma.broker.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!broker) {
            throw new Error("Broker not found.");
        }

        await prisma.broker.delete({
            where: {
                id,
            },
        });
    }

}