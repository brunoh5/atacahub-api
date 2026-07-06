import { ConfigService } from "@nestjs/config";
import type { Env } from "./env";
export declare class EnvService {
    private readonly configService;
    constructor(configService: ConfigService<Env, true>);
    get<T extends keyof Env>(key: T): import("@nestjs/config").PathValue<{
        PORT: number;
        POSTGRES_PORT: number;
        POSTGRES_USER: string;
        POSTGRES_DB: string;
        POSTGRES_PASSWORD: string;
    }, T>;
}
