import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { AddNewToInventoryDTO } from "../dtos/add-new-to-inventory.dto";
import { InventoriesRepository } from "../repositories/inventories-repository";
import { WarehousesRepository } from "../repositories/warehouses-repository";

@Injectable()
export class InventoryService {
  constructor(private readonly warehousesRespository: WarehousesRepository, private readonly inventoriesRepository: InventoriesRepository) { }

  async addNewProductToInventory(addNewToInventoryDto: AddNewToInventoryDTO) {
    if (!addNewToInventoryDto.warehouse_code) {
      throw new BadRequestException("Informações invalidas ou faltando");
    }

    const warehouse = await this.warehousesRespository.findByCode(addNewToInventoryDto.warehouse_code);

    if (!warehouse) {
      throw new BadRequestException("Depósito não encontrado");
    }

    const checkIfAlreadyCreated = await this.inventoriesRepository.findInventoryByVariantId(addNewToInventoryDto.product_variant_id);

    if (checkIfAlreadyCreated) {
      throw new ConflictException("Produto já cadastrado no inventário, adicione ou diminua a quantidade");
    }

    await this.inventoriesRepository.addNewProduct({
      ...addNewToInventoryDto,
      warehouse_id: warehouse.id,
    });
  }
}