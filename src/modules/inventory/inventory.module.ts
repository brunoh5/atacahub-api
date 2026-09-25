import { Module } from "@nestjs/common";
import { InventoryController } from "./controllers/inventory.controller.js";
import { WarehouseController } from "./controllers/warehouse.controller.js";
import { InventoriesRepository } from "./repositories/inventories-repository.js";
import { PgInventoriesRepository } from "./repositories/pg/pg-inventories-repository.js";
import { PgWarehousesRepository } from "./repositories/pg/pg-warehouses-repository.js";
import { WarehousesRepository } from "./repositories/warehouses-repository.js";
import { InventoryService } from "./services/inventory.service.js";
import { WarehouseService } from "./services/warehouse.service.js";

@Module({
  providers: [
    {
      provide: InventoriesRepository,
      useClass: PgInventoriesRepository,
    },
    {
      provide: WarehousesRepository,
      useClass: PgWarehousesRepository,
    },
    InventoryService,
    WarehouseService,
  ],
  controllers: [InventoryController, WarehouseController],
})
export class InventoryModule { }
