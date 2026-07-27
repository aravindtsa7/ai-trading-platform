import { z } from "zod";
import { BrokerType } from "@prisma/client";

export const createBrokerSchema = z.object({
  brokerType: z.nativeEnum(BrokerType),

  displayName: z
    .string()
    .trim()
    .min(3, "Display name must be at least 3 characters.")
    .max(100, "Display name cannot exceed 100 characters."),

  isDefault: z.boolean().optional(),
});

export const updateBrokerSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .optional(),

  isDefault: z.boolean().optional(),
});