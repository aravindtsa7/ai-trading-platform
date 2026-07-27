import { httpClient } from "../../../../common/http";
import { env } from "../../../../config";
import { decrypt } from "../../../../common/crypto";
import { PlaceOrderDto } from "../dto/PlaceOrderDto";

export class UpstoxService {

getAuthorizationUrl(brokerId: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: env.UPSTOX_CLIENT_ID,
    redirect_uri: env.UPSTOX_REDIRECT_URI,
    state: brokerId,
  });

  return `${env.UPSTOX_BASE_URL}/login/authorization/dialog?${params.toString()}`;
}

async exchangeAuthorizationCode(code: string) {
  const body = new URLSearchParams({
    code,
    client_id: env.UPSTOX_CLIENT_ID,
    client_secret: env.UPSTOX_CLIENT_SECRET,
    redirect_uri: env.UPSTOX_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const response = await httpClient.post(
    `${env.UPSTOX_BASE_URL}/login/authorization/token`,
    body.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    }
  );

  return response.data;
}

async getProfile(accessToken: string) {
    const token = decrypt(accessToken);

    const response = await httpClient.get(
        `${env.UPSTOX_BASE_URL}/user/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );

    return response.data;
}

async getFunds(accessToken: string) {
    const token = decrypt(accessToken);

    const response = await httpClient.get(
        `${env.UPSTOX_BASE_URL}/user/get-funds-and-margin`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );

    return response.data;
}

async getHoldings(accessToken: string) {
  const token = decrypt(accessToken);

  const response = await httpClient.get(
    `${env.UPSTOX_BASE_URL}/portfolio/long-term-holdings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
}

async getPositions(accessToken: string) {
  const token = decrypt(accessToken);

  const response = await httpClient.get(
    `${env.UPSTOX_BASE_URL}/portfolio/short-term-positions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
}

async getOrders(accessToken: string) {
  const token = decrypt(accessToken);

  const response = await httpClient.get(
    `${env.UPSTOX_BASE_URL}/order/retrieve-all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
}

async getTrades(accessToken: string) {
  const token = decrypt(accessToken);

  const response = await httpClient.get(
    `${env.UPSTOX_BASE_URL}/order/trades/get-trades-for-day`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
}

async placeOrder(
  accessToken: string,
  order: PlaceOrderDto
) {
  try {
    const token = decrypt(accessToken);

    const response = await httpClient.post(
      `${env.UPSTOX_BASE_URL}/order/place`,
      {
        quantity: order.quantity,
        product: order.product,
        validity: order.validity,
        price: order.price,
        tag: order.tag,
        instrument_token: order.instrumentToken,
        order_type: order.orderType,
        transaction_type: order.transactionType,
        disclosed_quantity: order.disclosedQuantity,
        trigger_price: order.triggerPrice,
        is_amo: order.isAmo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("========================================");
    console.error("Upstox Place Order Error");
    console.error("Status :", error.response?.status);
    console.error("Data   :", error.response?.data);
    console.error("========================================");

    throw error;
  }
}

}