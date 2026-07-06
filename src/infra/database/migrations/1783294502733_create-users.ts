import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('users', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true
    },
    password_hash: {
      type: "text",
      notNull: true,
    },
    first_name: {
      type: "varchar(100)",
      notNull: true
    },
    last_name: {
      type: "varchar(100)",
      notNull: true
    },
    is_active: {
      type: "boolean",
      default: false
    },
    last_login_at: "timestamptz",
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
    version: {
      type: "integer",
      default: 1
    }
  });

  pgm.createIndex('users', 'email');
  pgm.createIndex('users', 'is_active');
  pgm.createIndex('users', 'deleted_at');
}

export async function down(_pgm: MigrationBuilder): Promise<void> { }
