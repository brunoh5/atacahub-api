import { Body, Controller, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateCustomerDTO } from "../dtos/create-customer.dto";
import { CustomerService } from "../services/customer.service";

interface CreateCustomerBody {
  access_token: string,
  customer: CreateCustomerDTO
}

@Controller("/customers")
export class CustomerController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService,
  ) { }

  @Post()
  async create(
    @Body() body: CreateCustomerBody
  ) {
    const token = await this.jwtService.verify(body.access_token);

    const customer = await this.customerService.create(body.customer, token.sub);

    return { customer };
  }
}
