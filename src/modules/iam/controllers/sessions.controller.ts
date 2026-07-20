import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { EnvService } from "@/infra/env/env.service";
import { LoginDTO } from "../dtos/login.dto";
import { SessionService } from "../services/session.service";

@Controller("/sessions")
export class SessionsController {
  constructor(
    private readonly envService: EnvService,
    private readonly sessionsService: SessionService,
  ) { }

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

    const { access_token, refresh_token } = await this.sessionsService.login(
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

    await this.sessionsService.logout(refresh_token);

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
      await this.sessionsService.renovateSession(refresh_token);

    return { access_token };
  }
}
