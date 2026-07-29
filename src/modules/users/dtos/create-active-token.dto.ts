export class CreateActiveTokenDTO {
  user_id: string;
  token_hash: string;
  type: string;
  expires_at: Date;
}