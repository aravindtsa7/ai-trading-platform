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
} from "../../../common/jwt";

export class AuthService {
  constructor(
    private readonly authRepository: IAuthRepository
  ) {}

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

}