"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const env_service_1 = require("./infra/env/env.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("v1");
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    const configService = app.get(env_service_1.EnvService);
    const port = configService.get("PORT");
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map