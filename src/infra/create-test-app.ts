import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import type TestAgent from "supertest/lib/agent";
import { AppModule } from "@/app.module";

export async function createTestApp(): Promise<{ app: INestApplication, request: TestAgent }> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  await app.init();

  return {
    app,
    request: request(app.getHttpServer()),
  };
}
