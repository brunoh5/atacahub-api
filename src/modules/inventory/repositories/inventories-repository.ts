import { AddNewToInventoryDTO } from "../dtos/add-new-to-inventory.dto";
import { Inventory } from "../interfaces/Inventory";

export interface addNewProduct extends AddNewToInventoryDTO {
  warehouse_id: string;
}

export abstract class InventoriesRepository {
  abstract addNewProduct(addNewInputValues: addNewProduct): Promise<void>;
  abstract findInventoryByVariantId(variant_id: string): Promise<Inventory>
}