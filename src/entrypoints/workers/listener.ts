import redis from "redis";

import { ScheduleNotification } from "../../usescases";
import { config } from "../../adapters/config";

interface ArgI {
  scheduleNotification: ScheduleNotification;
}

export class Worker {
  private handler: ScheduleNotification;
  private subscriber: redis.RedisClient;
  constructor({ scheduleNotification }: ArgI) {
    this.handler = scheduleNotification;
    this.subscriber = redis.createClient({ url: config.db.redis_url });
  }
  listen(): void {
    this.subscriber.on("message", (channel: string, message: string) => {
      console.log(`Message from ${channel}`);
      this.handler.execute(JSON.parse(message));
    });
    this.subscriber.subscribe("DROPOFF");
  }
}
