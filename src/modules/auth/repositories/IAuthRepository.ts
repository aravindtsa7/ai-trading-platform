import { User } from "@prisma/client";
import { RegisterDto } from "../dto/register.dto";

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  create(data: RegisterDto & { passwordHash: string }): Promise<User>;

  saveRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date
  ): Promise<void>;
}