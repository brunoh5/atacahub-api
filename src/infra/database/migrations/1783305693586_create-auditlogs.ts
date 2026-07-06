import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('audit_logs', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    user_id: {
      type: "uuid",
      references: "users",
    },
    entity_type: {
      type: "varchar(100)",
      notNull: true,
    },
    entity_id: "uuid",
    action: {
      type: "varchar(100)",
      notNull: true,
    },
    old_data: "JSONB",
    new_date: "JSONB",
    ip_address: "INET",
    user_agent: "text",
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  })
}

export async function down(_pgm: MigrationBuilder): Promise<void> { }
