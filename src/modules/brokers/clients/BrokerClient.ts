export interface BrokerProfile {
    brokerUserId: string;
    name: string;
    email?: string;
    mobile?: string;
}

export interface BrokerFunds {
    availableBalance: number;
    usedMargin: number;
    totalBalance: number;
}

export interface BrokerHolding {
    symbol: string;
    quantity: number;
    averagePrice: number;
    currentPrice?: number;
}

export interface BrokerPosition {
    symbol: string;
    quantity: number;
    averagePrice: number;
    pnl?: number;
}

export interface PlaceOrderRequest {
    exchange: string;
    symbol: string;
    transactionType: "BUY" | "SELL";
    orderType: "MARKET" | "LIMIT" | "SL";
    product: string;
    quantity: number;
    price?: number;
}

export interface BrokerClient {
    getProfile(): Promise<BrokerProfile>;

    getFunds(): Promise<BrokerFunds>;

    getHoldings(): Promise<BrokerHolding[]>;

    getPositions(): Promise<BrokerPosition[]>;

    placeOrder(order: PlaceOrderRequest): Promise<any>;

    cancelOrder(orderId: string): Promise<void>;
}