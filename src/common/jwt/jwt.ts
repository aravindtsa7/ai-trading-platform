import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  SignOptions,
  TokenExpiredError,
} from "jsonwebtoken";

import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import { jwtConfig } from "../../config";

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, jwtConfig.accessSecret, {
    expiresIn: jwtConfig.accessExpiresIn,
  } as SignOptions);
}

export function generateRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn,
  } as SignOptions);
}

export function verifyAccessToken(token: string): JwtPayload {
  try {
    return jwt.verify(
      token,
      jwtConfig.accessSecret
    ) as JwtPayload;
  } catch (error) {

    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError("Access token has expired.");
    }

    if (error instanceof JsonWebTokenError) {
      throw new UnauthorizedError("Invalid access token.");
    }

    if (error instanceof NotBeforeError) {
      throw new UnauthorizedError("Access token is not active yet.");
    }

    throw error;
  }
}

export function verifyRefreshToken(token: string): JwtPayload {
    try {
    return jwt.verify(
      token,
      jwtConfig.accessSecret
    ) as JwtPayload;
  } catch (error) {

    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError("Access token has expired.");
    }

    if (error instanceof JsonWebTokenError) {
      throw new UnauthorizedError("Invalid access token.");
    }

    if (error instanceof NotBeforeError) {
      throw new UnauthorizedError("Access token is not active yet.");
    }

    throw error;
  }
}