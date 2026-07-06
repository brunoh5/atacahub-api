import { Module } from "@nestjs/common";
import { EventListener } from "./event.listener";
import { EventService } from "./events.service";

@Module({
  providers: [EventListener, EventService]
})
export class EventsModule { }