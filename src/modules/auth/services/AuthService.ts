import bcrypt from "bcrypt";
import { User } from "@prisma/client";

import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { AuthResponse } from "../types/AuthResponse";

import { IAuthRepository } from "../repositories/IAuthRepository";

import { ConflictError } from "../../../common/exceptions/ConflictError";
import { UnauthorizedError } from "../../../common/exceptions/UnauthorizedError";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../common/jwt";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { LogoutDto } from "../dto/logout.dto";

export class AuthService {
  constructor(
    private readonly authRepository: IAuthRepository
  ) { }

  async register(data: RegisterDto): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("Email already registered.");
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await this.authRepository.create({
      ...data,
      passwordHash,
    });

    return user;
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      user.passwordHash
    );

    if (!passwordMatches) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    
    await this.authRepository.updateLastLogin(user.id);

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Refresh token expires in 7 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.authRepository.saveRefreshToken(
      user.id,
      refreshToken,
      expiresAt
    );

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
      accessToken,
      refreshToken,
    };
  }

  async me(userId: string) {
    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedError("User not found.");
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      emailVerified: user.emailVerified,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async refreshToken(
    data: RefreshTokenDto
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = verifyRefreshToken(data.refreshToken);

    const storedToken = await this.authRepository.findRefreshToken(
      data.refreshToken
    );

    if (!storedToken) {
      throw new UnauthorizedError("Invalid refresh token.");
    }

    if (storedToken.revokedAt) {
      throw new UnauthorizedError("Refresh token has been revoked.");
    }

    if (storedToken.expiresAt < new Date()) {
      throw new UnauthorizedError("Refresh token has expired.");
    }

    const accessToken = generateAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    const newRefreshToken = generateRefreshToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.authRepository.revokeRefreshToken(data.refreshToken);

    await this.authRepository.saveRefreshToken(
      payload.userId,
      newRefreshToken,
      expiresAt
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(data: LogoutDto): Promise<void> {
    verifyRefreshToken(data.refreshToken);

    const storedToken = await this.authRepository.findRefreshToken(
      data.refreshToken
    );

    if (!storedToken) {
      throw new UnauthorizedError("Invalid refresh token.");
    }

    if (storedToken.revokedAt) {
      throw new UnauthorizedError("Refresh token has already been revoked.");
    }

    await this.authRepository.revokeRefreshToken(data.refreshToken);
  }

}