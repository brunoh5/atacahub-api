import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/infra/database/database.service.js";
import { Inventory } from "../../interfaces/Inventory.js";
import {
  addNewProduct,
  InventoriesRepository,
} from "../inventories-repository.js";

@Injectable()
export class PgInventoriesRepository implements InventoriesRepository {
  constructor(private readonly databaseService: DatabaseService) { }

  async addNewProduct(addNewInputValues: addNewProduct): Promise<void> {
    const result = await this.databaseService.query({
      text: ` 
        INSERT INTO inventories(warehouse_id, product_variant_id, quantity_available, quantity_reserved)
        VALUES($1, $2, $3, $4)
      `,
      values: [
        addNewInputValues.warehouse_id,
        addNewInputValues.product_variant_id,
        addNewInputValues.quantity_available,
        addNewInputValues.quantity_reserved,
      ],
    });

    return result.rows[0];
  }

  async findInventoryByVariantId(variant_id: string): Promise<Inventory> {
    const result = await this.databaseService.query({
      text: `
        SELECT * FROM inventories WHERE product_variant_id = $1
      `,
      values: [variant_id],
    });

    return result.rows[0];
  }
}
