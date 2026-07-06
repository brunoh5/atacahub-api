import { Injectable } from "@nestjs/common";
// biome-ignore lint/style/useImportType: runtime error
import { ConfigService } from "@nestjs/config";
import type { Env } from "./env";

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService<Env, true>) { }

  get<T extends keyof Env>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
