import type { CreateUserDTO } from "../dtos/create-user.dto";
import { User } from "../interfaces/User";

export abstract class UsersRepository {
  abstract createUser(userInputValues: CreateUserDTO): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User | null>
}
