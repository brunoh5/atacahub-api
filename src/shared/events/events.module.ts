import { Module } from "@nestjs/common";
import { EventListener } from "./event.listener.js";
import { EventService } from "./events.service.js";

@Module({
  providers: [EventListener, EventService]
})
export class EventsModule { }