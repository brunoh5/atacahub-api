import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/infra/database/database.service";
import { SaveRefreshTokenDTO } from "../../dtos/save-refresh-token.dto";
import { SaveSessionDTO } from "../../dtos/save-session.dto";
import { RefreshToken } from "../../interfaces/RefreshToken";
import { SessionsRepository } from "../SessionsRepository";

@Injectable()
export class PgSessionsRepository implements SessionsRepository {
  constructor(private readonly database: DatabaseService) { }

  async getRefreshTokenDetails(refresh_token: string): Promise<RefreshToken> {
    const result = await this.database.query({
      text: `
        SELECT revoked_at, expires_at, user_id FROM refresh_token WHERE token_hash = $1
      `,
      values: [refresh_token],
    });

    return result.rows[0];
  }

  async revokeRefreshToken(refresh_token: string): Promise<void> {
    await this.database.query({
      text: `
        UPDATE refresh_token
        SET revoked_at = NOW()
        WHERE token_hash = $1
      `,
      values: [refresh_token],
    });
  }

  async saveSession(sessionInputValues: SaveSessionDTO): Promise<void> {
    await this.database.query({
      text: `
        INSERT INTO
          sessions(user_id, ip_address, user_agent, device_name, expires_at)
        VALUES($1, $2, $3, $4, $5)
      `,
      values: [
        sessionInputValues.user_id,
        sessionInputValues.ip_address,
        sessionInputValues.user_agent,
        sessionInputValues.device_name,
        sessionInputValues.expires_at,
      ],
    });
  }

  async saveRefreshToken(
    refreshTokenInputValues: SaveRefreshTokenDTO,
  ): Promise<void> {
    await this.database.query({
      text: `
        INSERT INTO
          refresh_token(user_id, token_hash, expires_at)
        VALUES($1, $2, $3)
      `,
      values: [
        refreshTokenInputValues.user_id,
        refreshTokenInputValues.token_hash,
        refreshTokenInputValues.expires_at,
      ],
    });
  }
}
