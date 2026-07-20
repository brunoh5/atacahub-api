import { INestApplication } from "@nestjs/common";
import TestAgent from "supertest/lib/agent";
import { createTestApp } from "@/infra/create-test-app";
import { DatabaseService } from "@/infra/database/database.service";
import faker from "@/shared/faker";
import { createAndVerifyUser } from "@/shared/tests/create-and-verify-user";

let app: INestApplication;
let request: TestAgent;

describe("customer.controller", () => {
  beforeAll(async () => {
    const testApp = await createTestApp();

    app = testApp.app;
    request = testApp.request;

    const databaseService = app.get(DatabaseService);

    await databaseService.clearDatabase();
    await databaseService.migrationsUp();
  });

  test("Create comercial profile for user", async () => {
    const email = faker.internet.email();
    const first_name = faker.person.firstName()

    await createAndVerifyUser(request, { email });

    const loginResponse = await request
      .post("/v1/sessions/login")
      .send({ email, password: "123456" });

    const response = await request.post("/v1/customers").send({
      access_token: loginResponse.body.access_token,
      customer: {
        comercial_profile: {
          first_name,
          last_name: faker.person.lastName(),
        },
        customer_documents: {
          type: "CPF",
          document: "12345678950",
          is_primary: true,
        },
        customer_addresses: [
          {
            label: "Home",
            recipient_name: first_name,
            phone: faker.phone.number(),
            postal_code: faker.location.zipCode(),
            street: faker.location.street(),
            number: faker.location.buildingNumber(),
            neighborhood: faker.location.county(),
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.country()
          }
        ],
        customer_contacts: [
          {
            type: "phone",
            value: faker.phone.number(),
            is_primary: true,
          }
        ]
      }
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      customer: {
        id: expect.any(String)
      }
    })
  });

  test("Create a duplicated comercial profile for user", async () => {
    const email = faker.internet.email();
    const first_name = faker.person.firstName()

    await createAndVerifyUser(request, { first_name, email });

    const loginResponse = await request
      .post("/v1/sessions/login")
      .send({ email, password: "123456" });

    const reqData = {
      access_token: loginResponse.body.access_token,
      customer: {
        comercial_profile: {
          first_name,
          last_name: faker.person.lastName(),
        },
        customer_documents: {
          type: "CPF",
          document: "12345678950",
          is_primary: true,
        },
        customer_addresses: [
          {
            label: "Home",
            recipient_name: first_name,
            phone: faker.phone.number(),
            postal_code: faker.location.zipCode(),
            street: faker.location.street(),
            number: faker.location.buildingNumber(),
            neighborhood: faker.location.county(),
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.country()
          }
        ],
        customer_contacts: [
          {
            type: "phone",
            value: faker.phone.number(),
            is_primary: true,
          }
        ]
      }
    }

    await request.post("/v1/customers").send(reqData);

    const response = await request.post("/v1/customers").send(reqData);

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      message: "Usuário já possui um cadastro comercial",
    });
  });
});
