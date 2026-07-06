import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EventService } from "./events.service";

export interface Event {
  entity_id?: string;
  entity_type: string;
  user_id: string;
  action: string;
  created_at: Date;
  ip_address?: string;
  user_agent?: string;
  old_data?: unknown | null;
  new_data?: unknown;
}

@Injectable()
export class EventListener {
  constructor(private eventService: EventService) { }

  @OnEvent("*")
  async handleAudit(event: Event) {
    await this.eventService.audit(event);
  }
}
