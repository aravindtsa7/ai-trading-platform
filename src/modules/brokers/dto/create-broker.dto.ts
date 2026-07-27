import { BrokerType } from "@prisma/client";

export interface CreateBrokerDto {
    brokerType: BrokerType;
    displayName: string;
    isDefault?: boolean;
}