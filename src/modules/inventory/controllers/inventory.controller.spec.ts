import { INestApplication } from "@nestjs/common";
import TestAgent from "supertest/lib/agent";
import { createTestApp } from "@/infra/create-test-app";
import { DatabaseService } from "@/infra/database/database.service";
import { createProduct } from "@/shared/tests/create-product";

describe("inventory.controller", () => {
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

  test("save product in inventory", async () => {
    await request.post("/v1/warehouses").send({
      name: "Loja 01",
      code: "loja-01"
    });

    const product = await createProduct(request);

    const response = await request.post('/v1/inventories').send({
      warehouse_code: "loja-01",
      product_variant_id: product.variants[0].id,
      quantity_available: 10,
      quantity_reserved: 4
    });

    expect(response.status).toBe(204);
  });

  test("save product duplicated in inventory", async () => {
    await request.post("/v1/warehouses").send({
      name: "Loja 01",
      code: "loja-01"
    });

    const product = await createProduct(request, { category: { name: "Padaria" } });

    await request.post('/v1/inventories').send({
      warehouse_code: "loja-01",
      product_variant_id: product.variants[0].id,
      quantity_available: 10,
      quantity_reserved: 4
    });


    const response = await request.post('/v1/inventories').send({
      warehouse_code: "loja-01",
      product_variant_id: product.variants[0].id,
      quantity_available: 10,
      quantity_reserved: 4
    });

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      message: "Produto já cadastrado no inventário, adicione ou diminua a quantidade"
    })
  });
})