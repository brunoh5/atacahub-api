import { CreateCustomerDTO } from "../dtos/create-customer.dto.js";
import { Customer } from "../interfaces/Customer.js";

export abstract class CustomerRepository {
  abstract createComercialProfile(customerInputValues: CreateCustomerDTO, user_id: string): Promise<Customer>
  abstract findByUserId(id: string): Promise<Customer>;
}