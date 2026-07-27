import {
    BrokerClient,
    BrokerFunds,
    BrokerHolding,
    BrokerPosition,
    BrokerProfile,
    PlaceOrderRequest,
} from "../../clients";

export class UpstoxClient implements BrokerClient {

    constructor(
        private readonly accessToken: string
    ) {}

    async getProfile(): Promise<BrokerProfile> {
        throw new Error("Not implemented.");
    }

    async getFunds(): Promise<BrokerFunds> {
        throw new Error("Not implemented.");
    }

    async getHoldings(): Promise<BrokerHolding[]> {
        throw new Error("Not implemented.");
    }

    async getPositions(): Promise<BrokerPosition[]> {
        throw new Error("Not implemented.");
    }

    async placeOrder(
        order: PlaceOrderRequest
    ): Promise<any> {
        throw new Error("Not implemented.");
    }

    async cancelOrder(
        orderId: string
    ): Promise<void> {
        throw new Error("Not implemented.");
    }
}