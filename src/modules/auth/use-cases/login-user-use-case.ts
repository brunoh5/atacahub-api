import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "argon2";
import { LoginDTO } from "../dtos/login.dto";
import { SessionsRepository } from "../repositories/SessionsRepository";
import { UsersRepository } from "../repositories/UsersRespository";

export class UserMetadata {
  ip_address: string;
  user_agent: string;
  device_name: string;
}

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly sessionsRepository: SessionsRepository,
  ) { }

  async execute(loginUserInputValues: LoginDTO, metadata: UserMetadata) {
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
}
