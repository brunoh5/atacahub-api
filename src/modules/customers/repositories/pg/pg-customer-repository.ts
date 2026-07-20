import { Injectable } from "@nestjs/common";
import { QueryResult } from "pg";
import { DatabaseService } from "@/infra/database/database.service";
import { CreateCustomerDTO } from "../../dtos/create-customer.dto";
import { Customer } from "../../interfaces/Customer";
import { CustomerRepository } from "../customer-repository";

@Injectable()
export class PgCustomerRepository implements CustomerRepository {
  constructor(private readonly databaseService: DatabaseService) { }
  async findByUserId(id: string): Promise<Customer> {
    const result = await this.databaseService.query({
      text: `
        SELECT * FROM customers WHERE user_id = $1
      `,
      values: [id]
    });

    return result.rows[0];
  }

  async createComercialProfile(
    {
      comercial_profile,
      customer_addresses,
      customer_contacts,
      customer_documents,
    }: CreateCustomerDTO,
    user_id: string,
  ): Promise<Customer> {
    const result = await this.databaseService.transactions(async (tx) => {
      const insertCustomerResult: QueryResult<Customer> =
        await tx({
          text: `
          INSERT INTO customers(user_id, first_name, last_name) VALUES($1, $2, $3)
        RETURNING *
      `,
          values: [user_id, comercial_profile.first_name, comercial_profile.last_name],
        });

      const customer = insertCustomerResult.rows[0];

      for (const address of customer_addresses) {
        await tx({
          text: `
            INSERT INTO
              customer_addresses(customer_id, label, recipient_name, postal_code, street, number, neighborhood, city, state, country)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          `,
          values: [customer.id, address.label, address.recipient_name, address.postal_code, address.street, address.number, address.neighborhood, address.city, address.state, address.country]
        })
      }

      for (const contacts of customer_contacts) {
        await tx({
          text: `
            INSERT INTO
              customer_contacts(customer_id, type, value, is_primary)
            VALUES($1, $2, $3, $4)
          `,
          values: [customer.id, contacts.type, contacts.value, contacts.is_primary]
        })
      }

      await tx({
        text: `
            INSERT INTO
              customer_documents(customer_id, type, document, is_primary)
            VALUES($1, $2, $3, $4)
          `,
        values: [customer.id, customer_documents.type, customer_documents.document, customer_documents.is_primary]
      })

      return customer;
    });

    return result;
  }
}
