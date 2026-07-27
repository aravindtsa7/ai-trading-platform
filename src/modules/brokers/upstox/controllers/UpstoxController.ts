import { Request, Response, NextFunction } from "express";

import { ApiResponse } from "../../../../common/responses/ApiResponse";
import { AuthenticatedRequest } from "../../../../middleware/auth.middleware";

import { UpstoxService } from "../services/UpstoxService";
import { BrokerService } from "../../services/BrokerService";
import { AppError } from "../../../../common/exceptions/AppError";
import { PlaceOrderSchema } from "../validators/PlaceOrderValidator";

export class UpstoxController {
  constructor(
    private readonly upstoxService: UpstoxService,
    private readonly brokerService: BrokerService
  ) { }

  async getProfile(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const brokerId = String(req.params.brokerId);

      const credential =
        await this.brokerService.getBrokerCredential(
          brokerId
        );

      if (!credential || !credential.accessToken) {
        throw new Error("Broker is not connected.");
      }

      const profile =
        await this.upstoxService.getProfile(
          credential.accessToken
        );

      ApiResponse.success(res, {
        message: "Profile fetched successfully",
        data: profile,
      });

    } catch (error) {
      next(error);
    }
  }

  async login(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const brokerId = String(req.params.brokerId);

      const url = this.upstoxService.getAuthorizationUrl(brokerId);
      console.log(url);
      res.redirect(url);
    } catch (error) {
      next(error);
    }
  }

  async callback(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const code = String(req.query.code);
      const brokerId = String(req.query.state);

      const token =
        await this.upstoxService.exchangeAuthorizationCode(
          code
        );

      await this.brokerService.saveBrokerCredential({
        brokerId,
        brokerUserId: token.user_id,
        accessToken: token.access_token,
        refreshToken: undefined,
        tokenExpiresAt: undefined,
      });

      ApiResponse.success(res, {
        message: "Broker connected successfully",
        data: {
          brokerId,
          broker: token.broker,
          brokerUserId: token.user_id,
          userName: token.user_name,
        },
      });
    } catch (error) {
      next(error);
    }
  }

async getFunds(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const brokerId = String(req.params.brokerId);

    const credential = await this.brokerService.getBrokerCredential(brokerId);

    if (!credential || !credential.accessToken) {
      throw new AppError("Broker is not connected.", 400);
    }

    const funds = await this.upstoxService.getFunds(
      credential.accessToken
    );

    ApiResponse.success(res, {
      message: "Funds fetched successfully",
      data: funds,
    });
  } catch (error) {
    next(error);
  }
}

async getHoldings(
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

    const holdings =
      await this.upstoxService.getHoldings(
        credential.accessToken
      );

    ApiResponse.success(res, {
      message: "Holdings fetched successfully",
      data: holdings,
    });

  } catch (error) {
    next(error);
  }
}

async getPositions(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const brokerId = String(req.params.brokerId);

    const credential = await this.brokerService.getBrokerCredential(brokerId);

    if (!credential || !credential.accessToken) {
      throw new AppError("Broker is not connected.", 400);
    }

    const positions = await this.upstoxService.getPositions(
      credential.accessToken
    );

    ApiResponse.success(res, {
      message: "Positions fetched successfully",
      data: positions,
    });
  } catch (error) {
    next(error);
  }
}

async getOrders(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const brokerId = String(req.params.brokerId);

    const credential = await this.brokerService.getBrokerCredential(brokerId);

    if (!credential || !credential.accessToken) {
      throw new AppError("Broker is not connected.", 400);
    }

    const orders = await this.upstoxService.getOrders(
      credential.accessToken
    );

    ApiResponse.success(res, {
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
}

async getTrades(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const brokerId = String(req.params.brokerId);

    const credential =
      await this.brokerService.getBrokerCredential(
        brokerId
      );

    if (!credential || !credential.accessToken) {
      throw new AppError("Broker is not connected.", 400);
    }

    const trades =
      await this.upstoxService.getTrades(
        credential.accessToken
      );

    ApiResponse.success(res, {
      message: "Trades fetched successfully",
      data: trades,
    });

  } catch (error) {
    next(error);
  }
}

async placeOrder(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const brokerId = String(req.params.brokerId);

    const credential =
      await this.brokerService.getBrokerCredential(
        brokerId
      );

    if (!credential || !credential.accessToken) {
      throw new AppError("Broker is not connected.", 400);
    }

    const order =
      PlaceOrderSchema.parse(req.body);

    const result =
      await this.upstoxService.placeOrder(
        credential.accessToken,
        order
      );

    ApiResponse.success(res, {
      message: "Order placed successfully",
      data: result,
    });

  } catch (error) {
    next(error);
  }
}


}