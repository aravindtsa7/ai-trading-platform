import {
    Broker,
    BrokerCredential,
    BrokerType,
} from "@prisma/client";

export interface CreateBrokerData {
    userId: string;
    brokerType: BrokerType;
    displayName: string;
    isDefault?: boolean;
}

export interface CreateBrokerCredentialData {
    brokerUserId?: string;
    accessToken?: string;
    refreshToken?: string;
    tokenExpiresAt?: Date;
}

export interface IBrokerRepository {
    createBroker(data: CreateBrokerData): Promise<Broker>;

    findBrokerById(
        id: string,
        userId: string
    ): Promise<Broker | null>;

    findUserBrokers(userId: string): Promise<Broker[]>;

updateBroker(
    id: string,
    userId: string,
    data: Partial<CreateBrokerData>
): Promise<Broker>;

deleteBroker(
    id: string,
    userId: string
): Promise<void>;

}