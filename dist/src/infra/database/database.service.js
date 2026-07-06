"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_pg_migrate_1 = require("node-pg-migrate");
const pg_1 = require("pg");
const env_service_1 = require("../env/env.service");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    logger = new common_1.Logger(DatabaseService_1.name);
    configService = new config_1.ConfigService(env_service_1.EnvService);
    pool = new pg_1.Pool({
        host: this.configService.get('POSTGRES_HOST'),
        port: this.configService.get('POSTGRES_PORT'),
        user: this.configService.get('POSTGRES_USER'),
        database: this.configService.get('POSTGRES_DB'),
        password: this.configService.get('POSTGRES_PASSWORD'),
    });
    migrationsOptions = {
        databaseUrl: process.env.DATABASE_URL,
        dir: "./src/infra/database/migrations/",
        migrationsTable: "pgmigrations",
    };
    async query(query) {
        const start = performance.now();
        try {
            const result = await this.pool.query(query);
            const duration = performance.now() - start;
            this.logger.debug(`Query time: [${duration.toFixed(0)}ms] ${query.text}`);
            return result;
        }
        catch (error) {
            this.logger.fatal("Query Error", error);
            throw error;
        }
    }
    async onModuleInit() {
        try {
            await this.pool.connect();
            this.logger.log("Connected to PostgreSQL");
        }
        catch (error) {
            this.logger.error("Failed to connect to PostgreSQL", error);
            throw error;
        }
    }
    async onModuleDestroy() {
        await this.pool.end();
        this.logger.warn("PostgreSQL connection closed");
    }
    async migrationsUp() {
        await (0, node_pg_migrate_1.runner)({
            ...this.migrationsOptions,
            direction: "up",
        });
    }
    async migrationsDown() {
        await (0, node_pg_migrate_1.runner)({
            ...this.migrationsOptions,
            direction: "down",
        });
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map