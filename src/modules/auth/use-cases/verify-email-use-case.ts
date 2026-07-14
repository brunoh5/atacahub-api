import { ConflictException, Injectable } from "@nestjs/common";
import { ActiveTokensRepository } from "../repositories/ActiveTokensRepository";
import { UsersRepository } from "../repositories/UsersRespository";

@Injectable()
export class VerifyEmailUseCase {
  constructor(private readonly activeTokensRepository: ActiveTokensRepository, private readonly usersRespository: UsersRepository) { }

  async execute(token: string) {
    const userToken = await this.activeTokensRepository.findByUserToken(token);

    if (!userToken) {
      throw new ConflictException("Token já utilizado ou expirado");
    }

    return await this.activeTokensRepository.activeUser(userToken.user_id);
  }
}