import type { CreateUserDTO } from "../dtos/create-user.dto";
export declare abstract class UsersRepository {
    abstract createUser(userInputValues: CreateUserDTO): Promise<{
        id: string;
    }>;
}
