import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EnvModule } from "@/infra/env/env.module";
import { EnvService } from "@/infra/env/env.service";
import { PgUsersRepository } from "../users/repositories/pg/pg-users-repository";
import { UsersRepository } from "../users/repositories/UsersRespository";
import { RolesController } from "./controllers/roles.controller";
import { SessionsController } from "./controllers/sessions.controller";
import { PgRoleRepository } from "./repositories/pg/pg-role-repository";
import { PgSessionsRepository } from "./repositories/pg/pg-sessions-repository";
import { RoleRepository } from "./repositories/RoleRepository";
import { SessionsRepository } from "./repositories/SessionsRepository";
import { RoleService } from "./services/role.service";
import { SessionService } from "./services/session.service";

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
