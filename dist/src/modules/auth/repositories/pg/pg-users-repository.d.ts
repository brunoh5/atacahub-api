import { DatabaseService } from "../../../../infra/database/database.service";
import type { CreateUserDTO } from "../../dtos/create-user.dto";
import type { UsersRepository } from "../UsersRespository";
export declare class PgUsersRepository implements UsersRepository {
    private readonly database;
    constructor(database: DatabaseService);
    createUser(userInputValues: CreateUserDTO): Promise<{
        id: string;
    }>;
}
