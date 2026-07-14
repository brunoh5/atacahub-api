import { randomBytes } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { EmailService } from "@/infra/email/email.service";
import { User } from "../interfaces/User";
import { ActiveTokensRepository } from "../repositories/ActiveTokensRepository";

@Injectable()
export class CreateAndSendTokenService {
  constructor(
    private readonly activeTokenRepository: ActiveTokensRepository,
    private readonly emailService: EmailService,
  ) { }

  async execute(user: User): Promise<void> {
    const token = randomBytes(128).toString("hex");

    await this.activeTokenRepository.saveToken({
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
  }
}
