import { Module } from "@nestjs/common";
import { UsersRepository } from "./repositories/UsersRespository.js";
import { PgUsersRepository } from "./repositories/pg/pg-users-repository.js";
import { UsersController } from "./controllers/users.controller.js";
import { UserService } from "./services/user.service.js";
import { ActiveTokensRepository } from "./repositories/ActiveTokensRepository.js";
import { PgActiveTokensRepository } from "./repositories/pg/pg-active-tokens-repository.js";

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