import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { EnvService } from "../env/env.service";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private readonly configService = new ConfigService(EnvService);

  private readonly transporter = createTransport({
    host: this.configService.get("SMTP_HOST"),
    port: this.configService.get("SMTP_PORT"),
    secure: false,
    auth: {
      user: this.configService.get("SMTP_USER"),
      pass: this.configService.get("SMTP_PASS"),
    },
  });

  async send(emailOptions: Mail.Options) {
    try {
      await this.transporter.sendMail(emailOptions);

      this.logger.debug("Email sent");
    } catch (err) {
      throw new Error(err);
    }
  }
}
