import { ConflictException, Injectable } from "@nestjs/common";
import { CreateWarehouseDTO } from "../dtos/create-warehouse.dto";
import { WarehousesRepository } from "../repositories/warehouses-repository";

@Injectable()
export class WarehouseService {
  constructor(private readonly warehousesRepository: WarehousesRepository) { }

  async create(createWarehouseDto: CreateWarehouseDTO) {
    const checkIfWareHouseExists = await this.warehousesRepository.findByCode(createWarehouseDto.code);

    if (checkIfWareHouseExists) {
      throw new ConflictException("Depósito já existente");
    }

    const warehouse = await this.warehousesRepository.create(createWarehouseDto);

    return warehouse;
  }
}