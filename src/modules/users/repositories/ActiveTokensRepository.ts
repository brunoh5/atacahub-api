import { CreateActiveTokenDTO } from "../dtos/create-active-token.dto.js";
import { UserToken } from "../interfaces/UserToken.js";

export abstract class ActiveTokensRepository {
  abstract saveToken(tokenInputValues: CreateActiveTokenDTO): Promise<void>
  abstract findByUserToken(token: string): Promise<UserToken | undefined>
  abstract activeUser(user_id: string): Promise<void>
}