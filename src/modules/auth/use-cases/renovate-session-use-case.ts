import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SessionsRepository } from "../repositories/SessionsRepository";

@Injectable()
export class RenovateSessionUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionsRepository: SessionsRepository,
  ) { }

  async execute(refresh_token: string): Promise<string> {
    try {
      await this.jwtService.verify(refresh_token);
    } catch {
      throw new UnauthorizedException("Token Invalido");
    }

    const refresh_token_details =
      await this.sessionsRepository.getRefreshTokenDetails(refresh_token);

    if (refresh_token_details.revoked_at !== null) {
      throw new UnauthorizedException("Token expirado, faça login novamente");
    }

    if (new Date(refresh_token_details.expires_at) < new Date(Date.now())) {
      throw new UnauthorizedException("Token expirado, faça login novamente")
    }

    const access_token = this.jwtService.sign(
      { sub: refresh_token_details.user_id },
      { expiresIn: "15m" },
    );

    return access_token;
  }
}
