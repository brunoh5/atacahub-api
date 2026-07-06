"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestApp = createTestApp;
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("../app.module");
async function createTestApp() {
    const moduleRef = await testing_1.Test.createTestingModule({
        imports: [app_module_1.AppModule],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    return {
        app,
        request: (0, supertest_1.default)(app.getHttpServer()),
    };
}
//# sourceMappingURL=create-test-app.js.map