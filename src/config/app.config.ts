import { env } from "./env";

export const appConfig = {
  appName: "AI Trading Platform",
  version: "1.0.0",
  apiVersion: "v1",
  apiPrefix: "/api",
  environment: env.NODE_ENV,
  port: env.PORT,
} as const;