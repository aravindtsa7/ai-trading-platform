import { httpClient } from "../../../common/http/httpClient";
import { decrypt } from "../../../common/crypto";
import { env } from "../../../config/env";
import { HistoricalCandleDto } from "../dto/HistoricalCandleDto";

export class MarketDataService {
  async getHistoricalCandles(
    accessToken: string,
    dto: HistoricalCandleDto
  ) {
    try {
      const token = decrypt(accessToken);

      const response = await httpClient.get(
        `${env.UPSTOX_BASE_URL}/historical-candle/${dto.instrumentKey}/${dto.interval}/${dto.toDate}/${dto.fromDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("========================================");
      console.error("Upstox Historical Candle Error");
      console.error("Status :", error.response?.status);
      console.error("Data   :", error.response?.data);
      console.error("========================================");

      throw error;
    }
  }
}