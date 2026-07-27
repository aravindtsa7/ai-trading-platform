import { z } from "zod";

export const OptionChainSchema = z.object({
  instrumentKey: z
    .string()
    .min(1, "Instrument Key is required"),

  expiryDate: z
    .string()
    .min(1, "Expiry Date is required"),
});