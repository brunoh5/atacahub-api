import { DatabaseService } from "@/infra/database/database.service";
import { Event } from "./event.listener";

export class EventService {
  constructor(private readonly database: DatabaseService) { }

  async audit(event: Event) {
    await this.database.query({
      text: /* sql */ `
        INSERT INTO
          audit_logs(entity_id, entity_type, user_id, action, created_at, ip_address, user_agent, old_data, new_data)
        VALUES($1,$2,$3, $4, $5, $6, $7, $8, $9)
      `,
      values: [
        event.entity_id,
        event.entity_type,
        event.user_id,
        event.action,
        event.created_at,
        event.ip_address,
        event.user_agent,
        event.old_data,
        event.new_data,
      ],
    });
  }
}