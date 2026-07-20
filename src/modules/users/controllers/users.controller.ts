import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import z from "zod";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dtos/create-user.dto";

@Controller("/users")
export class UsersController {
  constructor(private userService: UserService) { }

  @Post("/register")
  async registerUser(@Body() createUserDto: CreateUserDTO) {
    const bodySchema = z.object({
      first_name: z.string(),
      last_name: z.string(),
      email: z.email(),
      password: z.string(),
    });

    const data = bodySchema.parse(createUserDto)

    const user = await this.userService.create(data);

    return { user };
  }

  @Patch("/verify-email/:token")
  @HttpCode(HttpStatus.NO_CONTENT)
  async activeToken(@Param("token") token: string) {
    return await this.userService.verifyEmail(token);
  }

  // @Post("/resend-verification")
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async resendToken(@Body() email: string) {
  //   return await this.createAndSendTokenService.execute()
  // }
}
