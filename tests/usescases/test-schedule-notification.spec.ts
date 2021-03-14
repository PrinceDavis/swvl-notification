import { EventEmitter } from "events";

import { fakeNotificationModel, fakeUserModel } from "../fakes/models";
import { ScheduleNotification } from "../../src/usescases";
import {
  NotificationRepository,
  UserRepository,
} from "../../src/adapters/repositories";

describe("ScheduleNotification", () => {
  const notificationRepository = new NotificationRepository({
    notificationModel: fakeNotificationModel,
  });
  const userRepository = new UserRepository({ userModel: fakeUserModel });
  const scheduleNotification = new ScheduleNotification({
    notificationRepository,
    userRepository,
  });

  test("It is an event emitter", () => {
    expect(scheduleNotification).toBeInstanceOf(EventEmitter);
  });

  test("It has SUCCESS, ERROR,and DATABASE_ERROR event types", () => {
    const { SUCCESS, ERROR, DATABASE_ERROR } = scheduleNotification.events;
    expect(DATABASE_ERROR).toBe("DATABASE_ERROR");
    expect(SUCCESS).toBe("SUCCESS");
    expect(ERROR).toBe("ERROR");
  });

  test("It emit SUCCESS event", async (done) => {
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
    const { SUCCESS } = scheduleNotification.events;
    const mockCallback = jest.fn();

    scheduleNotification.on(SUCCESS, mockCallback);
    await scheduleNotification.execute(options);

    expect(mockCallback.mock.calls[0][0].message).toEqual(
      options.notificationObj.message
    );
    done();
  });
});
