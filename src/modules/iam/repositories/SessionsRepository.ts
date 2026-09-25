import { SaveRefreshTokenDTO } from "../dtos/save-refresh-token.dto.js";
import { SaveSessionDTO } from "../dtos/save-session.dto.js";
import { RefreshToken } from "../interfaces/RefreshToken.js";

export abstract class SessionsRepository {
  abstract saveSession(sessionInputValues: SaveSessionDTO): Promise<void>
  abstract saveRefreshToken(refreshTokenInputValues: SaveRefreshTokenDTO): Promise<void>
  abstract revokeRefreshToken(refresh_token: string): Promise<void>
  abstract getRefreshTokenDetails(refresh_token: string): Promise<RefreshToken>
}