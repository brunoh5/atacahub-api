import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("customers", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    user_id: {
      notNull: true,
      type: "uuid",
      references: "users"
    },
    customer_group_id: "uuid",
    default_address_id: "uuid",
    first_name: {
      type: "varchar(100)",
      notNull: true
    },
    last_name: {
      type: "varchar(100)",
      notNull: true
    },
    company_name: "varchar(255)",
    birth_date: "date",
    notes: "text",
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

  pgm.createTable("customer_addresses", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    customer_id: {
      type: "uuid",
      references: "customers"
    },
    label: {
      type: "varchar(100)",
      notNull: true,
    },
    recipient_name: {
      type: "varchar(255)",
      notNull: true,
    },
    phone: "varchar(30)",
    postal_code: {
      notNull: true,
      type: "varchar(20)"
    },
    street: {
      notNull: true,
      type: "varchar(255)"
    },
    number: {
      notNull: true,
      type: "varchar(6)"
    },
    neighborhood: {
      notNull: true,
      type: "varchar(150)"
    },
    city: {
      notNull: true,
      type: "varchar(150)"
    },
    state: {
      notNull: true,
      type: "varchar(100)"
    },
    country: {
      notNull: true,
      type: "varchar(100)"
    },
    complement: "varchar(255)",
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

  pgm.createTable("customer_contacts", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    customer_id: {
      type: "uuid",
      references: "customers"
    },
    value: {
      type: "varchar(255)",
      notNull: true,
    },
    is_primary: {
      type: "boolean",
      default: true,
    },
    type: {
      type: "varchar(30)",
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

  pgm.createTable("customer_documents", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    customer_id: {
      type: "uuid",
      references: "customers"
    },
    type: {
      notNull: true,
      type: "varchar(30)",
    },
    document: {
      notNull: true,
      type: "varchar(30)",
    },
    is_primary: {
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

  pgm.createTable("customer_groups", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    name: {
      type: "varchar(100)",
      notNull: true,
    },
    description: "text",
    discount_percentage: "numeric(5,2)",
    is_active: {
      type: "boolean",
      default: false,
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
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("customers");
  pgm.dropTable("customers_addresses");
  pgm.dropTable("customers_contacts");
  pgm.dropTable("customers_documents");
  pgm.dropTable("customers_groups");
}
