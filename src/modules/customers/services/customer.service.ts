import { ConflictException, Injectable } from "@nestjs/common";
import { CreateCustomerDTO } from "../dtos/create-customer.dto";
import { CustomerRepository } from "../repositories/customer-repository";

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) { }

  async create(createCustomerDto: CreateCustomerDTO, user_id: string) {
    const customerProfileAlreadyExists = await this.customerRepository.findByUserId(user_id);

    if (customerProfileAlreadyExists) {
      throw new ConflictException("Usuário já possui um cadastro comercial");
    }

    const customer = await this.customerRepository.createComercialProfile(createCustomerDto, user_id);

    return customer;
  }
}