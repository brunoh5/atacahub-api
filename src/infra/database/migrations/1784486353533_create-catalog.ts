import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("categories", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    parent_id: "uuid",
    name: {
      type: "varchar(150)",
      notNull: true,
      unique: true,
    },
    slug: {
      type: "varchar(180)",
      notNull: true,
      unique: true,
    },
    description: "text",
    is_active: {
      type: "boolean",
      default: true,
    },
    sort_order: {
      type: "integer",
      notNull: true
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

  pgm.createTable("brands", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    name: {
      type: "varchar(150)",
      notNull: true,
      unique: true,
    },
    description: "text",
    slug: {
      type: "varchar(180)",
      notNull: true,
      unique: true,
    },
    website: "varchar(255)",
    is_active: {
      type: "boolean",
      default: true,
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

  pgm.createTable("suppliers", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    company_name: {
      type: "varchar(255)",
      notNull: true,
    },
    trade_name: "varchar(255)",
    email: "varchar(255)",
    phone: "varchar(30)",
    website: "varchar(255)",
    notes: "text",
    is_active: {
      type: "boolean",
      default: true,
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

  pgm.createIndex("suppliers", ["company_name, is_active"]);

  pgm.createTable("products", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    category_id: {
      type: "uuid",
      notNull: true,
      references: "categories"
    },
    brand_id: {
      type: "uuid",
      references: "categories"
    },
    supplier_id: {
      type: "uuid",
      references: "categories"
    },
    name: {
      type: "varchar(150)",
      notNull: true,
    },
    description: "text",
    short_description: "text",
    slug: {
      type: "varchar(180)",
      notNull: true,
      unique: true,
    },
    status: {
      type: "varchar(30)",
      notNull: true,
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

  pgm.createIndex("products", ["category_id", "brand_id", "status"]);

  pgm.createTable("product_variants", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    product_id: {
      type: "uuid",
      notNull: true,
      references: "categories"
    },
    sku: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },
    barcode: {
      type: "varchar(100)",
      unique: true,
      notNull: true,
    },
    price: {
      type: "integer",
      notNull: true,
    },
    cost_price: "integer",
    wight: "integer",
    width: "integer",
    height: "integer",
    length: "integer",
    is_active: {
      type: "boolean",
      default: true,
    },
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

  pgm.createIndex("product_variants", "product_id");

  pgm.createTable("product_images", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    product_id: {
      type: "uuid",
      notNull: true,
      references: "categories"
    },
    file_id: {
      type: "uuid",
      notNull: true,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    url: {
      type: "text",
      notNull: true,
    },
    alt_text: "varchar(255)",
    sort_order: {
      type: "integer",
      notNull: true
    },
    is_primary: {
      type: "boolean",
      default: "false"
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });

  pgm.createIndex("product_images", "product_id");

  pgm.createTable("attributes", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    name: {
      type: "varchar(100)",
      notNull: true,
    },
    code: {
      type: "varchar(100)",
      notNull: true,
      unique: true
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });

  pgm.createTable("attribute_values", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    attribute_id: {
      type: "uuid",
      notNull: true,
      references: "attributes"
    },
    value: {
      type: "varchar(150)",
      notNull: true,
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });

  pgm.createTable("product_attributes", {
    product_variant_id: {
      type: "uuid",
      notNull: true,
      references: "product_variants"
    },
    attribute_value_id: {
      type: "uuid",
      notNull: true,
      references: "attribute_values"
    }
  });

  pgm.addConstraint("product_attributes", "pk_product_variant_id_attribute_value_id", {
    primaryKey: ["product_variant_id", "attribute_value_id"]
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("categories");
  pgm.dropTable("brands");
  pgm.dropTable("suppliers");
  pgm.dropTable("products");
  pgm.dropTable("products_variants");
  pgm.dropTable("product_images");
  pgm.dropTable("attributes");
  pgm.dropTable("attribute_values");
  pgm.dropTable("products_attributes");
}
