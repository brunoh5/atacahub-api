import { INestApplication } from "@nestjs/common";
import TestAgent from "supertest/lib/agent";
import { createTestApp } from "@/infra/create-test-app";
import { DatabaseService } from "@/infra/database/database.service";
import faker from "@/shared/faker";
import { createAndVerifyUser } from "@/shared/tests/create-and-verify-user";
import { getVerificationToken } from "@/shared/tests/get-verifcation-token";

describe("sessions.controller", () => {
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

  afterAll(async () => {
    await fetch("http://localhost:8025/api/v1/messages", { method: "DELETE" });
  });

  test.skip("resend a token", async () => {
    const email = faker.internet.email();

    await request.post("/users/register").send({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email,
      password: "123456",
    });

    const _tokenAtRegistration = await getVerificationToken(email);

    const response = await request
      .post("/sessions/resend-verification")
      .send({ email });

    expect(response.status).toBe(204);

    const _resentToken = await getVerificationToken(email);
  });

  test("login user", async () => {
    const email = faker.internet.email();

    await createAndVerifyUser(request, { email });

    const response = await request
      .post("/v1/sessions/login")
      .send({ email, password: "123456" });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      access_token: expect.any(String),
    });

    expect(response.headers["set-cookie"][0]).toContain("refresh_token=");
  });

  test("login with user not verified", async () => {
    const email = faker.internet.email();

    await request.post("/v1/users/register").send({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email,
      password: "123456",
    });

    const response = await request
      .post("/v1/sessions/login")
      .send({ email, password: "123456" });

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      message: "E-mail não verificado",
    });
  });

  test("logout user", async () => {
    const email = faker.internet.email();

    await createAndVerifyUser(request, { email });

    const loginResponse = await request
      .post("/v1/sessions/login")
      .send({ email, password: "123456" });

    const loginCookies = loginResponse.headers["set-cookie"];

    const logoutResponse = await request
      .post("/v1/sessions/logout")
      .set("Cookie", loginCookies);

    const logoutCookies = logoutResponse.headers["set-cookie"][0].split(";");

    expect(logoutResponse.status).toBe(204);
    expect(logoutCookies[0]).toMatch("refresh_token=");
  });

  test("access_token renovation", async () => {
    const email = faker.internet.email();

    await createAndVerifyUser(request, { email });

    const loginResponse = await request
      .post("/v1/sessions/login")
      .send({ email, password: "123456" });

    const loginCookies = loginResponse.headers["set-cookie"];

    const response = await request
      .post("/v1/sessions/renovate")
      .set("Cookie", loginCookies);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      access_token: expect.any(String),
    });
  });
});
