import TestAgent from "supertest/lib/agent";
import faker from "../faker";
import { getVerificationToken } from "./get-verifcation-token";

type UserData = {
  first_name?: string;
  last_name?: string;
  email: string;
  password?: string
}

export async function createAndVerifyUser(request: TestAgent, { first_name, last_name, email, password = '123456' }: UserData) {
  await request.post("/v1/users/register").send({
    first_name: first_name ?? faker.person.firstName(),
    last_name: last_name ?? faker.person.lastName(),
    email,
    password,
  });

  const token = await getVerificationToken(email);

  await request.patch(`/v1/users/verify-email/${token}`);
}