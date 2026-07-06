import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { runner } from "node-pg-migrate";
import { Pool, type QueryConfig, type QueryResult } from "pg";
import { EnvService } from "../env/env.service";

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);

  private readonly configService = new ConfigService(EnvService);

  private readonly pool = new Pool({
    host: this.configService.get('POSTGRES_HOST'),
    port: this.configService.get('POSTGRES_PORT'),
    user: this.configService.get('POSTGRES_USER'),
    database: this.configService.get('POSTGRES_DB'),
    password: this.configService.get('POSTGRES_PASSWORD'),
  });

  private readonly migrationsOptions = {
    databaseUrl: process.env.DATABASE_URL as string,
    dir: "./src/infra/database/migrations/",
    migrationsTable: "pgmigrations",
  };

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
      ...this.migrationsOptions,
      direction: "up",
    });
  }

  async migrationsDown() {
    await runner({
      ...this.migrationsOptions,
      direction: "down",
    });
  }
}