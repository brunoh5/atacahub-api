"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_use_case_1 = require("../use-cases/create-user-use-case");
let UsersController = class UsersController {
    createUserUseCase;
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async registerUser(createUserDto) {
        const user = await this.createUserUseCase.execute(createUserDto);
        return { user };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registerUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("/users"),
    __metadata("design:paramtypes", [create_user_use_case_1.CreateUserUseCase])
], UsersController);
//# sourceMappingURL=users.controller.js.map