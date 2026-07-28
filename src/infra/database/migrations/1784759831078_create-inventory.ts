import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("warehouses", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    name: {
      type: "varchar(150)",
      notNull: true
    },
    code: {
      type: "varchar(50)",
      notNull: true,
      unique: true,
    },
    description: "text",
    is_active: {
      type: "boolean",
      default: true
    },
    deleted_at: "timestamptz",
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    }
  });

  pgm.createIndex("warehouses", "is_active");

  pgm.createTable("warehouse_locations", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    warehouse_id: {
      type: "uuid",
      references: "warehouses",
      notNull: true
    },
    code: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },
    is_active: {
      type: "boolean",
      default: true
    },
    description: "text",
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    }
  });

  pgm.createIndex("warehouse_locations", "warehouse_id");

  pgm.createTable("inventories", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    warehouse_id: {
      type: 'uuid',
      notNull: true,
      references: "warehouses"
    },
    warehouse_location_id: {
      type: 'uuid',
      references: "warehouse_locations",
    },
    product_variant_id: {
      type: 'uuid',
      notNull: true,
      references: "product_variants",
      unique: true,
    },
    quantity_available: {
      notNull: true,
      type: "integer",
      default: 0,
    },
    quantity_reserved: {
      notNull: true,
      type: "integer",
      default: 0,
    },
    minimum_stock: {
      type: "integer",
      default: 0,
    },
    maximum_stock: {
      type: "integer",
      default: 0,
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    }
  });

  pgm.createIndex("inventories", "product_variant_id");

  // pgm.createTable("inventory_reservations", {
  //   id: {
  //     type: 'uuid',
  //     primaryKey: true,
  //     default: pgm.func('uuidv7()')
  //   },
  //   inventory_id: {
  //     type: 'uuid',
  //     notNull: true,
  //     references: "inventories"
  //   },
  //   order_id: {
  //     type: 'uuid',
  //     notNull: true,
  //     references: "orders"
  //   },
  //   quantity: {
  //     type: "integer",
  //     notNull: true,
  //   },
  //   expires_at: "timestamptz",
  //   created_at: {
  //     type: "timestamptz",
  //     notNull: true,
  //     default: pgm.func("timezone('utc', now())"),
  //   }
  // });

  // pgm.createIndex("inventory_reservations", ["order_id", "inventory_id"]);

  pgm.createTable("inventory_moviments", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    inventory_id: {
      type: 'uuid',
      notNull: true,
      references: "inventories"
    },
    movement_type: {
      type: "varchar(30)",
      notNull: true,
    },
    quantity: {
      type: "integer",
      notNull: true,
    },
    reference_type: "varchar(50)",
    reference_id: "uuid",
    notes: "text",
    created_by: {
      type: "uuid",
      references: "users",
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });

  pgm.createIndex("inventory_moviments", ["inventory_id", "movement_type", "reference_type"]);

  pgm.createTable("inventory_adjustments", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    inventory_id: {
      type: 'uuid',
      notNull: true,
      references: "inventories"
    },
    adjusted_by: {
      type: "uuid",
      references: "users",
    },
    previous_quantity: {
      type: "integer",
      notNull: true,
    },
    new_quantity: {
      type: "integer",
      notNull: true,
    },
    reason: "text",
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    }
  });

  pgm.createIndex("inventory_adjustments", "inventory_id");

  pgm.createTable("inventory_transfers", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    source_warehouse_id: {
      type: 'uuid',
      notNull: true,
      references: "warehouses"
    },
    destination_warehouse_id: {
      type: 'uuid',
      notNull: true,
      references: "warehouses"
    },
    status: {
      type: "varchar(30)",
      notNull: true,
    },
    transferred_by: {
      type: "uuid",
      references: "users",
    },
    completed_at: "timestamptz",
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    }
  });

  pgm.createIndex("inventory_transfers", ["source_warehouse_id", "destination_warehouse_id", "status"]);

  pgm.createTable("inventory_counts", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    warehouse_id: {
      type: 'uuid',
      notNull: true,
      references: "warehouses"
    },
    status: {
      type: "varchar(30)",
      notNull: true,
    },
    started_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    finished_at: "timestamptz",
  });

  pgm.createIndex("inventory_counts", ["warehouse_id", "status"]);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("warehouses");
  pgm.dropTable("warehouse_locations");
  pgm.dropTable("inventories");
  pgm.dropTable("inventory_reservations");
  pgm.dropTable("invetory_adjustments");
  pgm.dropTable("inventory_transfers");
  pgm.dropTable("inventory_counts");
}
