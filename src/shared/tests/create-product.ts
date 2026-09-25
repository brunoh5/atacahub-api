import TestAgent from "supertest/lib/agent.js"
import faker from "../faker.js";

interface TestData {
  category?: {
    name: string
  }
}

export async function createProduct(request: TestAgent, data?: TestData) {
  const categoryResponse = await request.post("/v1/categories").send({
    name: data?.category?.name ?? faker.food.ethnicCategory(),
    description: "Alimentos não perecíveis para o dia a dia.",
    sort_order: 1,
  });

  const response = await request.post("/v1/products").send({
    category_id: categoryResponse.body.category.id,
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
  });

  return response.body.product
}