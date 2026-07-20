import { ConflictException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/UsersRespository";
import { ActiveTokensRepository } from "@/modules/users/repositories/ActiveTokensRepository";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { hash } from "argon2";
import { randomBytes } from "node:crypto";
import { EmailService } from "@/infra/email/email.service";

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly activeTokensRepository: ActiveTokensRepository,
    private readonly emailService: EmailService
  ) { }

  async create(userInputValues: CreateUserDTO) {
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

    const token = randomBytes(128).toString("hex");

    await this.activeTokensRepository.saveToken({
      user_id: user.id,
      expires_at: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos
      type: "EMAIL_VERIFICATION",
      token_hash: token,
    });

    await this.emailService.send({
      from: '"Atacahub" <noreply@atacahub.com.br>',
      to: user.email,
      subject: "Verifique seu e-mail",
      text: `${user.first_name}, clique no link abaixo para verificar seu email
        http://localhost:3333/sessions/verify-email/${token}

        Atenciosamente,
        Equipe Atacahub
      `,
    });

    return user;
  }

  async verifyEmail(token: string) {
    const userToken = await this.activeTokensRepository.findByUserToken(token);

    if (!userToken) {
      throw new ConflictException("Token já utilizado ou expirado");
    }

    return await this.activeTokensRepository.activeUser(userToken.user_id);
  }
}