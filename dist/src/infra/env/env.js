"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.envSchema = zod_1.default.object({
    PORT: zod_1.default.coerce.number().optional().default(3333),
    POSTGRES_PORT: zod_1.default.coerce.number().optional().default(5432),
    POSTGRES_USER: zod_1.default.string(),
    POSTGRES_DB: zod_1.default.string(),
    POSTGRES_PASSWORD: zod_1.default.string(),
});
//# sourceMappingURL=env.js.map