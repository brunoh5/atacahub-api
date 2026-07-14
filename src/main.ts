import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { DatabaseService } from "./infra/database/database.service";
import { EnvService } from "./infra/env/env.service";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("v1");

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const configService = app.get(EnvService);
  const port = configService.get("PORT");

  const databaseService = app.get(DatabaseService);

  await databaseService.query({
    text: `
      INSERT INTO roles(name, is_system)
      VALUES("administrador", true), ("cliente", true)
      ON CONFLICT DO NOTHING
    `,
  });

  app.use(cookieParser());

  await app.listen(port);
}

bootstrap();
