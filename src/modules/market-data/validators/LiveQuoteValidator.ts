import { z } from "zod";

export const LiveQuoteSchema = z.object({
  instrumentKeys: z
    .array(z.string().min(1))
    .min(1, "At least one instrument key is required"),
});