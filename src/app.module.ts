import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { DatabaseModule } from "./infra/database/database.module";
import { EmailModule } from "./infra/email/email.module";
import { envSchema } from "./infra/env/env";
import { EnvModule } from "./infra/env/env.module";
import { CustomerModule } from "./modules/customers/customers.module";
import { IamModule } from "./modules/iam/iam.module";
import { UsersModule } from "./modules/users/users.module";
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
    EmailModule,
    EventsModule,
    IamModule,
    UsersModule,
    CustomerModule,
  ],
})
export class AppModule { }
