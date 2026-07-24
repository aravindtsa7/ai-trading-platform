import { Request, Response, NextFunction } from "express";

import { AuthenticatedRequest } from "../../../middleware/auth.middleware";

import { ApiResponse } from "../../../common/responses/ApiResponse";

import { AuthService } from "../services/AuthService";

export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.register(req.body);

      return ApiResponse.success(res, {
        message: "User registered successfully",
        statusCode: 201,
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          status: user.status,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.authService.login(req.body);

      return ApiResponse.success(res, {
        message: "Login successful",
        statusCode: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  me = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.me(req.user!.userId);

      return ApiResponse.success(res, {
        message: "User profile fetched successfully",
        statusCode: 200,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

}