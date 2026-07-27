import { Broker } from "@prisma/client";
import {
    IBrokerRepository,
    CreateBrokerData,
    CreateBrokerCredentialData,
} from "../interfaces/IBrokerRepository";

export class BrokerService {
    constructor(
        private readonly brokerRepository: IBrokerRepository
    ) { }

    async createBroker(
        broker: CreateBrokerData
    ): Promise<Broker> {
        return this.brokerRepository.createBroker(
            broker
        );
    }

    async getBroker(
        id: string,
        userId: string
    ): Promise<Broker | null> {
        return this.brokerRepository.findBrokerById(
            id,
            userId
        );
    }

    async getUserBrokers(userId: string): Promise<Broker[]> {
        return this.brokerRepository.findUserBrokers(userId);
    }

    async updateBroker(
        id: string,
        userId: string,
        data: Partial<CreateBrokerData>
    ): Promise<Broker> {
        return this.brokerRepository.updateBroker(
            id,
            userId,
            data
        );
    }

    async deleteBroker(
        id: string,
        userId: string
    ): Promise<void> {
        return this.brokerRepository.deleteBroker(
            id,
            userId
        );
    }

}