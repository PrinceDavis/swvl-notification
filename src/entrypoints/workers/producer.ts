import redis from "redis";

import { config } from "../../adapters/config";

const producer = redis.createClient({ url: config.db.redis_url });
const options = {
  notificationObj: {
    message: "$199 promo code is yours!",
  },
  userObj: {
    deviceId: "hdaheahfani1233",
    messagePreference: "sms",
    userType: "passenger",
    phone: 977437839373,
  },
};

producer.publish("DROPOFF", JSON.stringify(options), () => process.exit());
