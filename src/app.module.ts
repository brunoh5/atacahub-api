import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { DatabaseModule } from "./infra/database/database.module";
import { EmailModule } from "./infra/email/email.module";
import { envSchema } from "./infra/env/env";
import { EnvModule } from "./infra/env/env.module";
import { AuthModule } from "./modules/auth/auth.module";
import { EventsModule } from "./shared/events/events.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({ wildcard: true, delimiter: "." }),
    EnvModule,
    DatabaseModule,
    EventsModule,
    AuthModule,
    EmailModule,
  ],
})
export class AppModule { }
