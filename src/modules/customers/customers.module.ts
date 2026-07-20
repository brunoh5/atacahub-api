import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EnvModule } from "@/infra/env/env.module";
import { EnvService } from "@/infra/env/env.service";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerRepository } from "./repositories/customer-repository";
import { PgCustomerRepository } from "./repositories/pg/pg-customer-repository";
import { CustomerService } from "./services/customer.service";

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
