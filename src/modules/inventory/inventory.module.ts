import { Module } from "@nestjs/common";
import { InventoryController } from "./controllers/inventory.controller";
import { WarehouseController } from "./controllers/warehouse.controller";
import { InventoriesRepository } from "./repositories/inventories-repository";
import { PgInventoriesRepository } from "./repositories/pg/pg-inventories-repository";
import { PgWarehousesRepository } from "./repositories/pg/pg-warehouses-repository";
import { WarehousesRepository } from "./repositories/warehouses-repository";
import { InventoryService } from "./services/inventory.service";
import { WarehouseService } from "./services/warehouse.service";

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
