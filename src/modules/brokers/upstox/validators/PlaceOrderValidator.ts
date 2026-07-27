import { z } from "zod";

export const PlaceOrderSchema = z.object({
  quantity: z.number().int().positive(),

  product: z.enum([
    "D",
    "I",
    "CO",
    "OCO",
  ]),

  validity: z.enum([
    "DAY",
    "IOC",
  ]),

  price: z.number().min(0),

  tag: z.string().optional(),

  instrumentToken: z.string().min(1),

  orderType: z.enum([
    "MARKET",
    "LIMIT",
    "SL",
    "SL-M",
  ]),

  transactionType: z.enum([
    "BUY",
    "SELL",
  ]),

  disclosedQuantity: z.number().int().optional(),

  triggerPrice: z.number().optional(),

  isAmo: z.boolean().optional(),
});

export type PlaceOrderInput = z.infer<
  typeof PlaceOrderSchema
>;