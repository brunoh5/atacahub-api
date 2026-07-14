import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { runner } from "node-pg-migrate";
import {
  Pool,
  type QueryConfig,
  type QueryResult,
  type QueryResultRow,
} from "pg";
import { EnvService } from "../env/env.service";

type QueryFn = <T extends QueryResultRow = QueryResultRow>(query: {
  text: string;
  values?: unknown[];
}) => Promise<QueryResult<T>>;

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);

  private readonly pool: Pool;

  constructor(private readonly envService: EnvService) {
    this.pool = new Pool({
      host: this.envService.get("POSTGRES_HOST"),
      port: this.envService.get("POSTGRES_PORT"),
      user: this.envService.get("POSTGRES_USER"),
      database: this.envService.get("POSTGRES_DB"),
      password: this.envService.get("POSTGRES_PASSWORD"),
    });
  }

  async transactions<T>(callback: (query: QueryFn) => Promise<T>): Promise<T> {
    const start = performance.now();

    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      const result = await callback((query) => client.query(query));

      await client.query("COMMIT");

      const duration = performance.now() - start;

      this.logger.debug(`Transaction time: [${duration.toFixed(0)}ms]`);

      return result;
    } catch (err) {
      await client.query("ROLLBACK");

      throw err;
    } finally {
      client.release();
    }
  }

  async query(query: QueryConfig): Promise<QueryResult> {
    const start = performance.now();

    try {
      const result = await this.pool.query(query);

      const duration = performance.now() - start;

      this.logger.debug(`Query time: [${duration.toFixed(0)}ms] ${query.text}`);

      return result;
    } catch (error) {
      this.logger.fatal("Query Error", error);

      throw error;
    }
  }

  async onModuleInit() {
    try {
      await this.pool.connect();

      this.logger.log("Connected to PostgreSQL");
    } catch (error) {
      this.logger.error("Failed to connect to PostgreSQL", error);

      throw error;
    }
  }

  async onModuleDestroy() {
    await this.pool.end();

    this.logger.warn("PostgreSQL connection closed");
  }

  async migrationsUp() {
    await runner({
      databaseUrl: this.envService.get("DATABASE_URL"),
      dir: "./src/infra/database/migrations/",
      migrationsTable: "pgmigrations",
      direction: "up",
      logger: this.envService.get("NODE_ENV") === 'test'
        ? {
          debug: () => { },
          info: () => { },
          warn: () => { },
          error: () => { },
        }
        : {
          debug: this.logger.debug.bind(this.logger),
          info: this.logger.log.bind(this.logger),
          warn: this.logger.warn.bind(this.logger),
          error: this.logger.error.bind(this.logger),
        },
    });
  }

  async migrationsDown() {
    await runner({
      databaseUrl: this.envService.get("DATABASE_URL"),
      dir: "./src/infra/database/migrations/",
      migrationsTable: "pgmigrations",
      direction: "down",
    });
  }

  async clearDatabase() {
    await this.query({
      text: "drop schema public cascade; create schema public;"
    });
  }
}
