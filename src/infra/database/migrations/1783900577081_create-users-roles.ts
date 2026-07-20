import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("roles", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    name: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },
    is_system: {
      type: "boolean",
      default: false,
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
    },
    deleted_at: "timestamptz",
  });

  pgm.createIndex("roles", "name");

  pgm.createTable("permissions", {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    code: {
      type: "varchar(150)",
      notNull: true,
      unique: true,
    },
    name: {
      type: "varchar(150)",
      notNull: true,
    },
    resource: {
      type: "varchar(100)",
      notNull: true,
    },
    action: {
      type: "varchar(50)",
      notNull: true,
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
    },
  });

  pgm.createIndex("permissions", "resource");

  pgm.createTable("user_roles", {
    user_id: {
      type: 'uuid',
      references: "users",
      notNull: true
    },
    role_id: {
      type: 'uuid',
      references: "roles",
      notNull: true
    },
    assigned_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    assigned_by: {
      type: 'uuid',
      references: "users",
    }
  });

  pgm.addConstraint("user_roles", "PK_user_id_role_id", {
    primaryKey: ["user_id", "role_id"]
  });

  pgm.createTable("role_permissions", {
    role_id: {
      type: 'uuid',
      references: "roles",
      notNull: true
    },
    permission_id: {
      type: 'uuid',
      references: "users",
      notNull: true
    },
    granted_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    }
  });

  pgm.addConstraint("role_permissions", "pk_role_id_permission_id", {
    primaryKey: ["role_id", "permission_id"]
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("user_roles");
  pgm.dropTable("role_permissions");
  pgm.dropTable("permissions");
  pgm.dropTable("roles");
}
