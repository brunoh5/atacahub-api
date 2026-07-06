import type { INestApplication } from "@nestjs/common";
import type TestAgent from "supertest/lib/agent";
export declare function createTestApp(): Promise<{
    app: INestApplication;
    request: TestAgent;
}>;
