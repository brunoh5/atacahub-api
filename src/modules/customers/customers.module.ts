import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EnvModule } from "@/infra/env/env.module.js";
import { EnvService } from "@/infra/env/env.service.js";
import { CustomerController } from "./controllers/customer.controller.js";
import { CustomerRepository } from "./repositories/customer-repository.js";
import { PgCustomerRepository } from "./repositories/pg/pg-customer-repository.js";
import { CustomerService } from "./services/customer.service.js";

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
      provide: CustomerRepository,
      useClass: PgCustomerRepository,
    },
    CustomerService
  ],
  controllers: [CustomerController],
})
export class CustomerModule { }
