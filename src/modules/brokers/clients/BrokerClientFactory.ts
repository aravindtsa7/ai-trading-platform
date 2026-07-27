import { BrokerType } from "@prisma/client";

import { BrokerClient } from "./BrokerClient";
import { UpstoxClient } from "../upstox/client";

export class BrokerClientFactory {

    static create(
        brokerType: BrokerType,
        accessToken: string
    ): BrokerClient {

        switch (brokerType) {

            case BrokerType.UPSTOX:
                return new UpstoxClient(accessToken);

            default:
                throw new Error(
                    `Broker ${brokerType} is not supported.`
                );
        }
    }
}