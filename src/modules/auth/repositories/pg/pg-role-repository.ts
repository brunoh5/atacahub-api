import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/infra/database/database.service";
import { CreateRoleDTO } from "../../dtos/create-role.dto";
import { Role } from "../../interfaces/Role";
import { RoleRepository } from "../RoleRepository";

@Injectable()
export class PgRoleRepository implements RoleRepository {
  constructor(private readonly database: DatabaseService) { }

  async findByName(name: string): Promise<Role | null> {
    const result = await this.database.query({
      text: `
        SELECT * FROM roles WHERE name = LOWER($1)
      `,
      values: [name],
    });

    return result.rows[0];
  }

  async createRole(roleInputValues: CreateRoleDTO): Promise<Role> {
    const result = await this.database.query({
      text: `
        INSERT INTO roles(name, description)
        VALUES(LOWER($1), $2)
        RETURNING *
      `,
      values: [roleInputValues.name, roleInputValues.description],
    });

    return result.rows[0];
  }
}
