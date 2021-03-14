export const scheduleNotificationSchema = {
  body: {
    type: "object",
    additionalProperties: false,
    properties: {
      userObj: {
        additionalProperties: false,
        type: "object",
        properties: {
          phone: { type: "number", minLength: 8 },
          messagePreference: { type: "string" },
          deviceId: { type: "string" },
          userType: { type: "string" },
        },
        required: ["phone", "messagePreference", "deviceId", "userType"],
      },
      notificationObj: {
        additionalProperties: false,
        type: "object",
        properties: {
          recipientType: { type: "string" },
          message: { type: "string" },
        },
        required: ["message"],
      },
    },
    required: ["notificationObj"],
  },
};
