import redis from "redis";

import { ScheduleNotification } from "../../usescases";
import { config } from "../../adapters/config";

interface ArgI {
  scheduleNotification: ScheduleNotification;
}

const subscriber = redis.createClient({ url: config.db.redis_url });

export class Worker {
  private handler: ScheduleNotification;
  constructor({ scheduleNotification }: ArgI) {
    this.handler = scheduleNotification;
  }
  listen(): void {
    subscriber.on("message", (channel: string, message: string) => {
      console.log(`Message from ${channel}`);
      this.handler.execute(JSON.parse(message));
    });
    subscriber.subscribe("DROPOFF");
  }
}
