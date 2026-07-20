import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/infra/database/database.service";
import { CreateActiveTokenDTO } from "../../dtos/create-active-token.dto";
import { UserToken } from "../../interfaces/UserToken";
import { ActiveTokensRepository } from "../../../users/repositories/ActiveTokensRepository";

@Injectable()
export class PgActiveTokensRepository implements ActiveTokensRepository {
  constructor(private readonly database: DatabaseService) { }

  async activeUser(user_id: string): Promise<void> {
    await this.database.transactions(async query => {
      await query({
        text: `UPDATE active_tokens SET used_at = now() WHERE user_id = $1`,
        values: [user_id]
      });

      await query({
        text: `UPDATE users SET is_active = true WHERE id = $1`,
        values: [user_id]
      });
    })
  }

  async findByUserToken(token: string): Promise<UserToken> {
    const userToken = await this.database.query({
      text: `
        SELECT * FROM active_tokens
        WHERE token_hash = $1 AND expires_at > NOW()
        AND used_at IS NULL
      `,
      values: [token],
    });

    return userToken.rows[0];
  }

  async saveToken(tokenInputValues: CreateActiveTokenDTO): Promise<void> {
    await this.database.query({
      text: `
        INSERT INTO active_tokens(user_id, token_hash, type, expires_at)
        VALUES($1, $2, $3, NOW() + INTERVAL '30 minutes')
      `,
      values: [
        tokenInputValues.user_id,
        tokenInputValues.token_hash,
        tokenInputValues.type,
      ],
    });
  }
}
