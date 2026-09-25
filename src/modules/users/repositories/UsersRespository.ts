import type { CreateUserDTO } from "../../users/dtos/create-user.dto.js";
import { User } from "../../users/interfaces/User.js";

export abstract class UsersRepository {
  abstract createUser(userInputValues: CreateUserDTO): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User | null>
}
