import { type INestApplication, VersioningType } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import cookieParser from "cookie-parser";
import request from "supertest";
import type TestAgent from "supertest/lib/agent";
import { AppModule } from "@/app.module";
import { DatabaseService } from "./database/database.service";

export async function createTestApp(): Promise<{
  app: INestApplication;
  request: TestAgent;
}> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  app.setGlobalPrefix("v1");

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(cookieParser());

  const databaseService = app.get(DatabaseService);

  await databaseService.query({
    text: `
      INSERT INTO roles(name, is_system)
      VALUES('administrador', true), ('cliente', true)
      ON CONFLICT DO NOTHING
    `,
  });

  await app.init();

  return {
    app,
    request: request(app.getHttpServer()),
  };
}