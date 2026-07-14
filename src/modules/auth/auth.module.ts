import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EnvModule } from "@/infra/env/env.module";
import { EnvService } from "@/infra/env/env.service";
import { RolesController } from "./controllers/roles.controller";
import { SessionsController } from "./controllers/sessions.controller";
import { UsersController } from "./controllers/users.controller";
import { ActiveTokensRepository } from "./repositories/ActiveTokensRepository";
import { PgActiveTokensRepository } from "./repositories/pg/pg-active-tokens-repository";
import { PgRoleRepository } from "./repositories/pg/pg-role-repository";
import { PgSessionsRepository } from "./repositories/pg/pg-sessions-repository";
import { PgUsersRepository } from "./repositories/pg/pg-users-repository";
import { RoleRepository } from "./repositories/RoleRepository";
import { SessionsRepository } from "./repositories/SessionsRepository";
import { UsersRepository } from "./repositories/UsersRespository";
import { CreateAndSendTokenService } from "./services/create-and-send-token.service";
import { CreateRoleUseCase } from "./use-cases/create-role-use-case";
import { CreateUserUseCase } from "./use-cases/create-user-use-case";
import { LoginUserUseCase } from "./use-cases/login-user-use-case";
import { LogoutUserUseCase } from "./use-cases/logout-user-use-case";
import { RenovateSessionUseCase } from "./use-cases/renovate-session-use-case";
import { VerifyEmailUseCase } from "./use-cases/verify-email-use-case";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        return {
          secret: env.get("JWT_SECRET"),
        };
      },
    }),
  ],
  providers: [
    {
      provide: UsersRepository,
      useClass: PgUsersRepository,
    },
    {
      provide: ActiveTokensRepository,
      useClass: PgActiveTokensRepository,
    },
    {
      provide: SessionsRepository,
      useClass: PgSessionsRepository,
    },
    {
      provide: RoleRepository,
      useClass: PgRoleRepository,
    },
    CreateUserUseCase,
    VerifyEmailUseCase,
    CreateAndSendTokenService,
    LoginUserUseCase,
    LogoutUserUseCase,
    RenovateSessionUseCase,
    CreateRoleUseCase,
  ],
  controllers: [UsersController, SessionsController, RolesController],
})
export class AuthModule { }
