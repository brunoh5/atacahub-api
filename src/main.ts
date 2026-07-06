import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { EnvService } from "./infra/env/env.service";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("v1");

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const configService = app.get(EnvService);
  const port = configService.get("PORT");

  await app.listen(port);
}

bootstrap();
