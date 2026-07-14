import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { EnvService } from "@/infra/env/env.service";
import { LoginDTO } from "../dtos/login.dto";
import { LoginUserUseCase } from "../use-cases/login-user-use-case";
import { LogoutUserUseCase } from "../use-cases/logout-user-use-case";
import { RenovateSessionUseCase } from "../use-cases/renovate-session-use-case";
import { VerifyEmailUseCase } from "../use-cases/verify-email-use-case";

@Controller("/sessions")
export class SessionsController {
  constructor(
    private readonly envService: EnvService,
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
    // private readonly createAndSendTokenService: CreateAndSendTokenService,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly logoutUserUseCase: LogoutUserUseCase,
    private readonly renovateSessionUseCase: RenovateSessionUseCase,
  ) { }

  @Patch("/verify-email/:token")
  @HttpCode(HttpStatus.NO_CONTENT)
  async activeToken(@Param("token") token: string) {
    return await this.verifyEmailUseCase.execute(token);
  }

  // @Post("/resend-verification")
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async resendToken(@Body() email: string) {
  //   return await this.createAndSendTokenService.execute()
  // }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginInputValues: LoginDTO,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const reqMetadataHeaders = {
      ip_address: req.ip ?? "",
      user_agent: req.headers["user-agent"] ?? "",
      device_name: req.headers["user-agent"] ?? "",
    };

    const { access_token, refresh_token } = await this.loginUserUseCase.execute(
      loginInputValues,
      reqMetadataHeaders,
    );

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: this.envService.get("NODE_ENV") === "production",
      sameSite: true,
    });

    return { access_token };
  }

  @Post("/logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refresh_token = req.cookies.refresh_token;

    await this.logoutUserUseCase.execute(refresh_token);

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: this.envService.get("NODE_ENV") === "production",
      sameSite: true,
    });
  }

  @Post("/renovate")
  @HttpCode(HttpStatus.OK)
  async renovateSession(@Req() req: Request) {
    const refresh_token = req.cookies.refresh_token;

    const access_token =
      await this.renovateSessionUseCase.execute(refresh_token);

    return { access_token };
  }
}
