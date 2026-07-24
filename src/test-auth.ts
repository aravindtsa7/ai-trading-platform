import { PrismaAuthRepository } from "./infrastructure/prisma/repositories/PrismaAuthRepository";
import { AuthService } from "./modules/auth/services/AuthService";

async function main() {
  const repository = new PrismaAuthRepository();
  const service = new AuthService(repository);

  const user = await service.register({
    firstName: "Aravindhan",
    lastName: "S",
    email: "aravindhan@example.com",
    password: "Password@123",
    phone: "9876543210",
  });

  console.log(user);
}

main()
  .catch(console.error)
  .finally(() => process.exit());