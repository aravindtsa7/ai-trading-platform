import { z } from "zod";

export const HistoricalCandleSchema = z.object({
  instrumentKey: z.string().min(1, "Instrument Key is required"),

  interval: z.enum([
    "1minute",
    "3minute",
    "5minute",
    "10minute",
    "15minute",
    "30minute",
    "60minute",
    "day",
    "week",
    "month",
  ]),

  fromDate: z.string().min(1, "From Date is required"),

  toDate: z.string().min(1, "To Date is required"),
});