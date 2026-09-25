import { Injectable } from "@nestjs/common";
import { WarehousesRepository } from "../warehouses-repository.js";
import { CreateWarehouseDTO } from "../../dtos/create-warehouse.dto.js";
import { Warehouse } from "../../interfaces/Warehouse.js";
import { DatabaseService } from "@/infra/database/database.service.js";

@Injectable()
export class PgWarehousesRepository implements WarehousesRepository {
  constructor(private readonly databaseService: DatabaseService) { }

  async findByCode(code: string): Promise<Warehouse | null> {
    const result = await this.databaseService.query({
      text: /* sql */`
        SELECT * FROM warehouses WHERE LOWER(code) = LOWER($1)
      `,
      values: [
        code,
      ]
    })

    return result.rows[0];
  }

  async create(createWarehouseDto: CreateWarehouseDTO): Promise<Warehouse> {
    const result = await this.databaseService.query({
      text: /* sql */`
        INSERT INTO warehouses(name, code) VALUES($1, LOWER($2)) RETURNING *
      `,
      values: [
        createWarehouseDto.name,
        createWarehouseDto.code,
      ]
    });

    return result.rows[0];
  }
}
