import type { CreateUserDTO } from "../dtos/create-user.dto";
import { UsersRepository } from "../repositories/UsersRespository";
export declare class CreateUserUseCase {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(userInputValues: CreateUserDTO): Promise<string>;
}
