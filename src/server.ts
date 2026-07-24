import app from "./app";
import { appConfig } from "./config";
import { logger } from "./logger";

app.listen(appConfig.port, () => {
  logger.info("========================================");
  logger.info(`${appConfig.appName} Started`);
  logger.info(`Server running on http://localhost:${appConfig.port}`);
  logger.info(`Environment: ${appConfig.environment}`);
  logger.info("========================================");
});