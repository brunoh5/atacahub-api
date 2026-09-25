import { CreateWarehouseDTO } from "../dtos/create-warehouse.dto.js";
import { Warehouse } from "../interfaces/Warehouse.js";

export abstract class WarehousesRepository {
  abstract findByCode(code: string): Promise<Warehouse | null>;
  abstract create(createWarehouseDto: CreateWarehouseDTO): Promise<Warehouse>;
}