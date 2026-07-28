import { INestApplication } from "@nestjs/common";
import TestAgent from "supertest/lib/agent";
import { createTestApp } from "@/infra/create-test-app";
import { DatabaseService } from "@/infra/database/database.service";

describe("warehouse.controller", () => {
  let app: INestApplication;
  let request: TestAgent;

  beforeAll(async () => {
    const testApp = await createTestApp();

    app = testApp.app;
    request = testApp.request;

    const databaseService = app.get(DatabaseService);

    await databaseService.clearDatabase();
    await databaseService.migrationsUp();
  });

  it("create a warehouse", async () => {
    const response = await request.post("/v1/warehouses").send({
      name: "Loja 01",
      code: "loja-01"
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      warehouse: {
        id: expect.any(String),
        name: expect.any(String),
        code: expect.any(String),
      },
    });
  });

  it("create a warehouse with duplicated code", async () => {
    await request.post("/v1/warehouses").send({
      name: "Loja 02",
      code: "loja-02"
    });

    const response = await request.post("/v1/warehouses").send({
      name: "Loja 02",
      code: "loja-02"
    });

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      message: "Depósito já existente",
    });
  });
})