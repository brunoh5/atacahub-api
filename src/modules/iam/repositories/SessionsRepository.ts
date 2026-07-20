import { SaveRefreshTokenDTO } from "../dtos/save-refresh-token.dto";
import { SaveSessionDTO } from "../dtos/save-session.dto";
import { RefreshToken } from "../interfaces/RefreshToken";

export abstract class SessionsRepository {
  abstract saveSession(sessionInputValues: SaveSessionDTO): Promise<void>
  abstract saveRefreshToken(refreshTokenInputValues: SaveRefreshTokenDTO): Promise<void>
  abstract revokeRefreshToken(refresh_token: string): Promise<void>
  abstract getRefreshTokenDetails(refresh_token: string): Promise<RefreshToken>
}