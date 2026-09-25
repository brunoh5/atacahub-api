import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ThrottlerModule } from "@nestjs/throttler";
import { DatabaseModule } from "./infra/database/database.module.js";
import { EmailModule } from "./infra/email/email.module.js";
import { envSchema } from "./infra/env/env.js";
import { EnvModule } from "./infra/env/env.module.js";
import { CatalogModule } from "./modules/catalog/catalog.module.js";
import { CustomerModule } from "./modules/customers/customers.module.js";
import { IamModule } from "./modules/iam/iam.module.js";
import { InventoryModule } from "./modules/inventory/inventory.module.js";
import { UsersModule } from "./modules/users/users.module.js";
import { EventsModule } from "./shared/events/events.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    EventEmitterModule.forRoot({ wildcard: true, delimiter: "." }),
    EnvModule,
    DatabaseModule,
    EmailModule,
    EventsModule,
    IamModule,
    UsersModule,
    CustomerModule,
    CatalogModule,
    InventoryModule,
  ],
})
export class AppModule { }
