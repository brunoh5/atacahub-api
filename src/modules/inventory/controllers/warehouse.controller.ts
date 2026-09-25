import { Body, Controller, Post } from "@nestjs/common";
import { CreateWarehouseDTO } from "../dtos/create-warehouse.dto.js";
import { WarehouseService } from "../services/warehouse.service.js";

@Controller("/warehouses")
export class WarehouseController {
  constructor(private warehouseService: WarehouseService) { }

  @Post()
  async create(@Body() createWarehouseDto: CreateWarehouseDTO) {
    const warehouse = await this.warehouseService.create(createWarehouseDto);

    return { warehouse };
  }
}
