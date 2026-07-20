import { CreateCustomerDTO } from "../dtos/create-customer.dto";
import { Customer } from "../interfaces/Customer";

export abstract class CustomerRepository {
  abstract createComercialProfile(customerInputValues: CreateCustomerDTO, user_id: string): Promise<Customer>
  abstract findByUserId(id: string): Promise<Customer>;
}