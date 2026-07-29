import { INestApplication } from "@nestjs/common";
import TestAgent from "supertest/lib/agent";
import { createTestApp } from "@/infra/create-test-app";
import { DatabaseService } from "@/infra/database/database.service";
import faker from "@/shared/faker";

describe("product.controller", () => {
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

  test("create product", async () => {
    const categoryResponse = await request.post("/v1/categories").send({
      name: "Mercearia",
      description: "Alimentos não perecíveis para o dia a dia.",
      sort_order: 1,
    });

    const category = categoryResponse.body.category;

    const response = await request.post("/v1/products").send({
      category_id: category.id,
      name: "Arroz Branco Tipo 1",
      description: "Arroz branco tipo 1 selecionado, ideal para refeições do dia a dia. Possui grãos longos, soltinhos após o preparo e excelente rendimento.",
      short_description: "Arroz branco tipo 1 de alta qualidade, ideal para refeições do dia a dia.",
      status: "active",
      variants: [
        {
          cost_price: 1596,
          price: 2286,
          attributes: [
            { code: "peso", value: "5 Kg" }
          ]
        },
        {
          cost_price: 967,
          price: 1486,
          attributes: [
            { code: "peso", value: "1 Kg" },
            { code: "cor", value: "amarelo" }
          ]
        },
      ]
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      product: {
        name: expect.any(String),
        description: expect.any(String),
        slug: expect.any(String),
        category: {
          name: expect.any(String),
          slug: expect.any(String),
        },
        variants: [
          {
            sku: expect.any(String),
            cost_price: expect.any(Number),
            price: expect.any(Number),
            attributes: [
              { code: expect.any(String), value: expect.any(String) }
            ]
          },
          {
            sku: expect.any(String),
            cost_price: expect.any(Number),
            price: expect.any(Number),
            attributes: [
              { code: expect.any(String), value: expect.any(String) },
              { code: expect.any(String), value: expect.any(String) },
            ]
          },
        ]
      }
    })
  });

  test("create a duplicated product", async () => {
    const categoryResponse = await request.post("/v1/categories").send({
      name: faker.food.ethnicCategory(),
      description: "Alimentos não perecíveis para o dia a dia.",
      sort_order: 1,
    });

    const category = categoryResponse.body.category;

    const data = {
      category_id: category.id,
      name: faker.food.dish(),
      description: "Arroz branco tipo 1 selecionado, ideal para refeições do dia a dia. Possui grãos longos, soltinhos após o preparo e excelente rendimento.",
      short_description: "Arroz branco tipo 1 de alta qualidade, ideal para refeições do dia a dia.",
      status: "active",
      variants: [
        {
          cost_price: 1596,
          price: 2286,
          attributes: [
            { code: "peso", value: "5 Kg" }
          ]
        },
      ]
    }

    await request.post("/v1/products").send(data);

    const response = await request.post("/v1/products").send(data);

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      message: "Produto com slug já cadastrado, verifique se o produto já foi cadastrado"
    })
  })
});