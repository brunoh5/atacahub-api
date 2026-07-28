import { CreateWarehouseDTO } from "../dtos/create-warehouse.dto";
import { Warehouse } from "../interfaces/Warehouse";

export abstract class WarehousesRepository {
  abstract findByCode(code: string): Promise<Warehouse | null>;
  abstract create(createWarehouseDto: CreateWarehouseDTO): Promise<Warehouse>;
}