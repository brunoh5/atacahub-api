import { Injectable } from "@nestjs/common";
import { SessionsRepository } from "../repositories/SessionsRepository";

@Injectable()
export class LogoutUserUseCase {
  constructor(private readonly sessionsRepository: SessionsRepository) { }

  async execute(refresh_token: string): Promise<void> {
    await this.sessionsRepository.revokeRefreshToken(refresh_token);
  }
}