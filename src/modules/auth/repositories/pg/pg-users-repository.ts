import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/infra/database/database.service";
import type { CreateUserDTO } from "../../dtos/create-user.dto";
import { User } from "../../interfaces/User";
import type { UsersRepository } from "../UsersRespository";

@Injectable()
export class PgUsersRepository implements UsersRepository {
  constructor(private readonly database: DatabaseService) { }

  async findUserByEmail(email: string): Promise<User | null> {
    const queryResult = await this.database.query({
      text: `
        SELECT * FROM users WHERE LOWER(email) = LOWER($1)
      `,
      values: [email],
    });

    if (queryResult.rowCount === 0) {
      return null
    }

    return queryResult.rows[0];
  }

  async createUser(userInputValues: CreateUserDTO): Promise<User> {
    const queryResult = await this.database.query({
      text: `
        INSERT INTO users(first_name, last_name, email, password_hash) 
        VALUES($1, $2, LOWER($3), $4) RETURNING id, is_active, email
      `,
      values: [
        userInputValues.first_name,
        userInputValues.last_name,
        userInputValues.email,
        userInputValues.password,
      ],
    });

    return queryResult.rows[0];
  }
}
