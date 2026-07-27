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

  async getLiveQuote(
  accessToken: string,
  instrumentKeys: string[]
) {
  try {
    const token = decrypt(accessToken);

    const response = await httpClient.get(
      `${env.UPSTOX_BASE_URL}/market-quote/quotes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        params: {
          instrument_key: instrumentKeys.join(","),
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("========================================");
    console.error("Upstox Live Quote Error");
    console.error("Status :", error.response?.status);
    console.error("Data   :", error.response?.data);
    console.error("========================================");

    throw error;
  }
}

async getOptionChain(
  accessToken: string,
  instrumentKey: string,
  expiryDate: string
) {
  try {
    const token = decrypt(accessToken);

    const response = await httpClient.get(
      `${env.UPSTOX_BASE_URL}/option/chain`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        params: {
          instrument_key: instrumentKey,
          expiry_date: expiryDate,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("========================================");
    console.error("Upstox Option Chain Error");
    console.error("Status :", error.response?.status);
    console.error("Data   :", error.response?.data);
    console.error("========================================");

    throw error;
  }
}

}