import { Response, NextFunction } from "express";

import { AuthenticatedRequest } from "../../../middleware/auth.middleware";
import { ApiResponse } from "../../../common/responses/ApiResponse";
import { AppError } from "../../../common/exceptions/AppError";

import { BrokerService } from "../../brokers/services/BrokerService";
import { MarketDataService } from "../services/MarketDataService";
import { HistoricalCandleSchema } from "../validators/HistoricalCandleValidator";

export class MarketDataController {
  constructor(
    private readonly brokerService: BrokerService,
    private readonly marketDataService: MarketDataService
  ) {}
  
  async getHistoricalCandles(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const brokerId = String(req.params.brokerId);

      const credential =
        await this.brokerService.getBrokerCredential(brokerId);

      if (!credential || !credential.accessToken) {
        throw new AppError("Broker is not connected.", 400);
      }

      const dto = HistoricalCandleSchema.parse(req.query);

      const result =
        await this.marketDataService.getHistoricalCandles(
          credential.accessToken,
          dto
        );

      ApiResponse.success(res, {
        message: "Historical candles fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}