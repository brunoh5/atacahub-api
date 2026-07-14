import { INestApplication } from "@nestjs/common";
import TestAgent from "supertest/lib/agent";
import { createTestApp } from "@/infra/create-test-app";
import { DatabaseService } from "@/infra/database/database.service";

describe("roles.controller", () => {
  let request: TestAgent;
  let app: INestApplication;

  beforeAll(async () => {
    const testApp = await createTestApp();

    app = testApp.app;
    request = testApp.request;

    const databaseService = app.get(DatabaseService);

    await databaseService.clearDatabase();
    await databaseService.migrationsUp();
  });

  test("create new role", async () => {
    const response = await request.post("/v1/roles").send({
      name: "gerente",
      description: "Administra os outros funcionarios",
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      role: {
        id: expect.any(String),
      }
    });
  });

  test("create a duplicated role", async () => {
    await request.post("/v1/roles").send({
      name: "Gerente",
      description: "Administra os outros funcionarios",
    });

    const response = await request.post("/v1/roles").send({
      name: "gerente",
      description: "Administra os outros funcionarios",
    });

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      message: "Role já cadastrado",
    });
  });
});
