import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EnvModule } from "@/infra/env/env.module.js";
import { EnvService } from "@/infra/env/env.service.js";
import { PgUsersRepository } from "../users/repositories/pg/pg-users-repository.js";
import { UsersRepository } from "../users/repositories/UsersRespository.js";
import { RolesController } from "./controllers/roles.controller.js";
import { SessionsController } from "./controllers/sessions.controller.js";
import { PgRoleRepository } from "./repositories/pg/pg-role-repository.js";
import { PgSessionsRepository } from "./repositories/pg/pg-sessions-repository.js";
import { RoleRepository } from "./repositories/RoleRepository.js";
import { SessionsRepository } from "./repositories/SessionsRepository.js";
import { RoleService } from "./services/role.service.js";
import { SessionService } from "./services/session.service.js";

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
      provide: SessionsRepository,
      useClass: PgSessionsRepository,
    },
    {
      provide: RoleRepository,
      useClass: PgRoleRepository,
    },
    RoleService,
    SessionService,
  ],
  controllers: [SessionsController, RolesController],
})
export class IamModule { }
