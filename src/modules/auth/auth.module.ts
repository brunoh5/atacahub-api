import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { PgUsersRepository } from "./repositories/pg/pg-users-repository";
import { UsersRepository } from "./repositories/UsersRespository";
import { CreateUserUseCase } from "./use-cases/create-user-use-case";

@Module({
  providers: [
    {
      provide: UsersRepository,
      useClass: PgUsersRepository,
    },
    CreateUserUseCase,
  ],
  controllers: [UsersController],
})
export class AuthModule { }
