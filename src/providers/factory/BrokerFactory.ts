import { BrokerType } from "../BrokerType";

import { IBrokerProvider } from "../interfaces/IBrokerProvider";

import { UpstoxProvider } from "../upstox/UpstoxProvider";

export class BrokerFactory {

    static getProvider(
        brokerType: BrokerType
    ): IBrokerProvider {

        switch (brokerType) {

            case BrokerType.UPSTOX:
                return new UpstoxProvider();

            default:
                throw new Error(
                    `Unsupported broker: ${brokerType}`
                );

        }

    }

}