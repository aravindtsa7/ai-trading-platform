export interface PlaceOrderDto {
  quantity: number;

  product: "D" | "I" | "CO" | "OCO";

  validity: "DAY" | "IOC";

  price: number;

  tag?: string;

  instrumentToken: string;

  orderType: "MARKET" | "LIMIT" | "SL" | "SL-M";

  transactionType: "BUY" | "SELL";

  disclosedQuantity?: number;

  triggerPrice?: number;

  isAmo?: boolean;
}