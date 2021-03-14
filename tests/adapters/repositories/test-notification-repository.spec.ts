import { NotificationRepository } from "../../../src/adapters/repositories";
import { NotificationModel, UserModel } from "../../../src/adapters/models";
import { fakeNotificationModel } from "../../fakes/models";

describe("NotificationRepository", () => {
  const repository = new NotificationRepository({
    notificationModel: fakeNotificationModel,
  });

  test("add: returns a User entity", async () => {
    const user = await UserModel.build({
      deviceId: "hdaheahfani1233",
      messagePreference: "sms",
      userType: "passenger",
      phone: "977437839373",
    });
    const notification = await repository.add({
      message: "$199 promo code is yours!",
      recipientType: "passenger",
      multipleRecipient: true,
      recipientId: user.id,
    });
    expect(notification).toBeInstanceOf(NotificationModel);
  });
  test("fetchUnfinished: returns a User entity", async () => {
    const notification = await repository.fetchUnfinished();
    expect(notification).toBeInstanceOf(NotificationModel);
  });
  test("fetchUnfinished: returns a User entity", async () => {
    const notification = await repository.next();
    expect(notification).toBeInstanceOf(NotificationModel);
  });
});
