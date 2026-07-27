import { Response, NextFunction } from "express";

import { ApiResponse } from "../../../../common/responses/ApiResponse";
import { AuthenticatedRequest } from "../../../../middleware/auth.middleware";

import { UpstoxService } from "../services/UpstoxService";
import { BrokerService } from "../../services/BrokerService";

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
  

}