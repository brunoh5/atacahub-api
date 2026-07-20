import { UsersRepository } from "@/modules/users/repositories/UsersRespository";
import { LoginDTO } from "../dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
import { SessionsRepository } from "../repositories/SessionsRepository";
import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { verify } from "argon2";

export class UserMetadata {
  ip_address: string;
  user_agent: string;
  device_name: string;
}

@Injectable()
export class SessionService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly sessionsRepository: SessionsRepository,
  ) { }

  async login(loginUserInputValues: LoginDTO, metadata: UserMetadata) {
    const user = await this.usersRepository.findUserByEmail(
      loginUserInputValues.email,
    );

    if (!user) {
      throw new NotFoundException("E-mail ou senha incorretos");
    }

    const passwordMatch = await verify(
      user?.password_hash,
      loginUserInputValues.password,
    );

    if (!passwordMatch) {
      throw new BadRequestException("E-mail ou senha incorretos");
    }

    if (!user.is_active) {
      throw new ForbiddenException("E-mail não verificado");
    }

    const access_token = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: "15m" },
    );

    const refresh_token = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: "30d" },
    );

    await this.sessionsRepository.saveSession({ ...metadata, user_id: user.id, expires_at: new Date(Date.now() + 15 * 60 * 1000) });

    await this.sessionsRepository.saveRefreshToken({ user_id: user.id, token_hash: refresh_token, expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

    return {
      access_token,
      refresh_token,
    };
  }

  async logout(refresh_token: string): Promise<void> {
    await this.sessionsRepository.revokeRefreshToken(refresh_token);
  }

  async renovateSession(refresh_token: string): Promise<string> {
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