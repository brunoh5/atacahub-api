import TestAgent from "supertest/lib/agent";
import { createTestApp } from "@/infra/create-test-app";

describe("category.controller", () => {
  let request: TestAgent;

  beforeAll(async () => {
    const testApp = await createTestApp();

    request = testApp.request;
  });

  test("create category", async () => {
    const response = await request.post("/v1/categories").send({
      name: "Hortifruti",
      description: "",
      sort_order: 1,
    });

    expect(response.status).toBe(204);
    expect(response.body).toMatchObject({
      category: {
        id: expect.any(String),
        name: expect.any(String),
        parent_category_name: expect.any(String),
        sort_order: expect.any(Number)
      },
    });
  });

  test("create a sub-category", async () => {
    const parentCategoryResponse = await request.post("/v1/categories").send({
      name: "Hortifruti",
      description: "",
      sort_order: 1,
    });

    const response = await request.post("/v1/categories").send({
      name: "Frutas",
      description: "",
      sort_order: 1,
      parent_id: parentCategoryResponse.body.category.id
    });

    expect(response.status).toBe(204);
    expect(response.body).toMatchObject({
      category: {
        id: expect.any(String),
        name: expect.any(String),
        parent_category_name: expect.any(String),
        sort_order: expect.any(Number)
      },
    });
  });

  test("create a duplicated category", async () => {
    await request.post("/v1/categories").send({
      name: "Hortifruti",
      description: "",
      sort_order: 1,
    });

    const response = await request.post("/v1/categories").send({
      name: "Hortifruti",
      description: "",
      sort_order: 1,
    });

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      message: "Categoria já criada"
    });
  });
});
