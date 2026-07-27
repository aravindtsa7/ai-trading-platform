import { Request, Response, NextFunction } from "express";
import { BrokerService } from "../services/BrokerService";
import { CreateBrokerDto } from "../dto/create-broker.dto";
import { UpdateBrokerDto } from "../dto/update-broker.dto";
import { ApiResponse } from "../../../common/responses/ApiResponse";
import { AuthenticatedRequest } from "../../../middleware/auth.middleware";


export class BrokerController {
  constructor(
    private readonly brokerService: BrokerService
  ) { }

  async create(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = req.body as CreateBrokerDto;

      const broker = await this.brokerService.createBroker({
        userId: req.user!.userId,
        brokerType: dto.brokerType,
        displayName: dto.displayName,
        isDefault: dto.isDefault,
      });

      ApiResponse.success(res, {
        message: "Broker created successfully",
        statusCode: 201,
        data: broker,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const brokers = await this.brokerService.getUserBrokers(
        req.user!.userId
      );

      ApiResponse.success(res, {
        message: "Brokers fetched successfully",
        data: brokers,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = String(req.params.id);
      const broker = await this.brokerService.getBroker(
        id,
        req.user!.userId
      );

      ApiResponse.success(res, {
        message: "Broker fetched successfully",
        data: broker,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = req.body as UpdateBrokerDto;
      const id = String(req.params.id);

      const broker = await this.brokerService.updateBroker(
        id,
        req.user!.userId,
        dto
      );

      ApiResponse.success(res, {
        message: "Broker updated successfully",
        data: broker,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = String(req.params.id);
      await this.brokerService.deleteBroker(
        id,
        req.user!.userId
      );

      ApiResponse.success(res, {
        message: "Broker deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}