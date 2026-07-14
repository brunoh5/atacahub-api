
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { hash } from "argon2";
import type { CreateUserDTO } from "../dtos/create-user.dto";
import { UsersRepository } from "../repositories/UsersRespository";
import { CreateAndSendTokenService } from "../services/create-and-send-token.service";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly createAndSendTokenService: CreateAndSendTokenService
  ) { }

  async execute(userInputValues: CreateUserDTO) {
    const checkIfUserExists = await this.usersRepository.findUserByEmail(
      userInputValues.email,
    );

    if (checkIfUserExists) {
      throw new HttpException("User already created", HttpStatus.CONFLICT);
    }

    const password_hash = await hash(userInputValues.password);

    const user = await this.usersRepository.createUser({
      ...userInputValues,
      password: password_hash,
    });

    await this.createAndSendTokenService.execute(user);

    return user;
  }
}
