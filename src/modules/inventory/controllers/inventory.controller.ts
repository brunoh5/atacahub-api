import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AddNewToInventoryDTO } from "../dtos/add-new-to-inventory.dto";
import { InventoryService } from "../services/inventory.service";

@Controller("/inventories")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async addNewToInventory(@Body() addNewToInventoryDto: AddNewToInventoryDTO) {
    await this.inventoryService.addNewProductToInventory(addNewToInventoryDto);
  }
}