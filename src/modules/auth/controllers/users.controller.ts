import { Body, Controller, Post } from "@nestjs/common";
import z from "zod";
import type { CreateUserDTO } from "../dtos/create-user.dto";
import { CreateUserUseCase } from "../use-cases/create-user-use-case";

@Controller("/users")
export class UsersController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  @Post("/register")
  async registerUser(@Body() createUserDto: CreateUserDTO) {
    const bodySchema = z.object({
      first_name: z.string(),
      last_name: z.string(),
      email: z.email(),
      password: z.string(),
    });

    const data = bodySchema.parse(createUserDto)

    const user = await this.createUserUseCase.execute(data);

    return { user };
  }
}
