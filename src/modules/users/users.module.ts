import { Module } from "@nestjs/common";
import { UsersRepository } from "./repositories/UsersRespository";
import { PgUsersRepository } from "./repositories/pg/pg-users-repository";
import { UsersController } from "./controllers/users.controller";
import { UserService } from "./services/user.service";
import { ActiveTokensRepository } from "./repositories/ActiveTokensRepository";
import { PgActiveTokensRepository } from "./repositories/pg/pg-active-tokens-repository";

@Module({
  providers: [
    {
      provide: UsersRepository,
      useClass: PgUsersRepository,
    },
    {
      provide: ActiveTokensRepository,
      useClass: PgActiveTokensRepository,
    },
    UserService
  ],
  controllers: [UsersController],
})
export class UsersModule {

}