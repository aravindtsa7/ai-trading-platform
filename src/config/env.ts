import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 3000,

  DATABASE_URL: process.env.DATABASE_URL!,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "7d",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY!,

  UPSTOX_BASE_URL: process.env.UPSTOX_BASE_URL!,

  UPSTOX_CLIENT_ID: process.env.UPSTOX_CLIENT_ID!,

  UPSTOX_CLIENT_SECRET: process.env.UPSTOX_CLIENT_SECRET!,

  UPSTOX_REDIRECT_URI: process.env.UPSTOX_REDIRECT_URI!,

  UPSTOX_SANDBOX_ACCESS_TOKEN: process.env.UPSTOX_SANDBOX_ACCESS_TOKEN!,

};