import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import { SendMailOptions } from "nodemailer";
import { EnvService } from "../env/env.service.js";

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

  async send(emailOptions: SendMailOptions) {
    try {
      await this.transporter.sendMail(emailOptions);

      this.logger.debug("Email sent");
    } catch (error) {
      throw new Error(error);
    }
  }
}
