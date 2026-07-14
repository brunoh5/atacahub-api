import { HttpStatus, INestApplication } from "@nestjs/common";
import argon2 from "argon2";
import TestAgent from "supertest/lib/agent";
import { createTestApp } from "@/infra/create-test-app";
import faker from "@/shared/faker";
import { getUserEmail } from "@/shared/tests/get-user-email";
import { UsersRepository } from "../repositories/UsersRespository";

describe("users.controller", () => {
  let app: INestApplication;
  let request: TestAgent;
  let usersRepositories: UsersRepository;

  beforeAll(async () => {
    const testApp = await createTestApp();

    app = testApp.app;
    request = testApp.request;

    usersRepositories = app.get(UsersRepository);
  });

  test("create new user", async () => {
    const email = faker.internet.email();

    const response = await request.post("/v1/users/register").send({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email,
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toMatchObject({
      id: expect.any(String),
      is_active: false,
    });

    const user = await usersRepositories.findUserByEmail(email);

    expect(email.toLowerCase()).toBe(user?.email);

    if (!user?.password_hash) {
      throw new Error();
    }

    const correctPasswordMatch = await argon2.verify(
      user?.password_hash,
      "123456",
    );

    expect(correctPasswordMatch).toBe(true);

    const message = await getUserEmail(email);

    expect(message.Content.Headers.To[0]).toContain(email.toLowerCase());
    expect(message.Content.Headers.Subject[0]).toBe("Verifique seu e-mail");

    const active_link = message.Content.Body.match(/http?:\/\/\S+/)[0];

    expect(active_link).toStrictEqual(expect.any(String));
  });

  test("create a duplicated email", async () => {
    const userEmail = faker.internet.email();

    await request.post("/v1/users/register").send({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: userEmail,
      password: "123456",
    });

    const response = await request.post("/v1/users/register").send({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: userEmail,
      password: "123456",
    });

    expect(response.body).toEqual({
      statusCode: HttpStatus.CONFLICT,
      message: "User already created",
    });
  });
});
