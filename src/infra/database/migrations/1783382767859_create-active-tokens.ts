import { type ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('active_tokens', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuidv7()')
    },
    user_id: {
      type: 'uuid',
      references: "users",
      notNull: true
    },
    token_hash: {
      type: "text",
      notNull: true,
    },
    type: {
      type: "varchar(50)",
      notNull: true
    },
    expires_at: {
      type: "timestamptz",
      notNull: true,
    },
    used_at: {
      type: "timestamptz",
    },
    revoked_at: {
      type: "timestamptz",
    },
    metadata: "JSONB",
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("active_tokens");
}
