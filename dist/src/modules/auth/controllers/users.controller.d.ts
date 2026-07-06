import type { CreateUserDTO } from "../dtos/create-user.dto";
import { CreateUserUseCase } from "../use-cases/create-user-use-case";
export declare class UsersController {
    private createUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase);
    registerUser(createUserDto: CreateUserDTO): Promise<{
        user: string;
    }>;
}
