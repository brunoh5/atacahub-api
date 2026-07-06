import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { type QueryConfig, type QueryResult } from "pg";
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    private readonly configService;
    private readonly pool;
    private readonly migrationsOptions;
    query(query: QueryConfig): Promise<QueryResult>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    migrationsUp(): Promise<void>;
    migrationsDown(): Promise<void>;
}
