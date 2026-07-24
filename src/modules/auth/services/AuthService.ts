import bcrypt from "bcrypt";
import { User } from "@prisma/client";

import { RegisterDto } from "../dto/register.dto";
import { IAuthRepository } from "../repositories/IAuthRepository";

export class AuthService {
  constructor(
    private readonly authRepository: IAuthRepository
  ) {}

  async register(data: RegisterDto): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already registered.");
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await this.authRepository.create({
      ...data,
      passwordHash,
    });

    return user;
  }
}