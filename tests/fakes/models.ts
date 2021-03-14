import { NotificationModel, UserModel } from "../../src/adapters/models";
import { NotificationObjI } from "../../src/contracts/notification";
import { UserObjectI } from "../../src/contracts/user";

export const fakeUserModel = {
  create: async (user: UserObjectI): Promise<UserModel> => {
    return UserModel.build(user);
  },
  findAll: async (options: unknown): Promise<UserModel[]> => {
    return Promise.resolve([
      UserModel.build({
        deviceId: "hdaheahfani1233",
        messagePreference: "sms",
        userType: "passenger",
        phone: "977437839373",
      }),
    ]);
  },

  findOne: async (options: unknown): Promise<UserModel> => {
    return Promise.resolve(
      UserModel.build({
        deviceId: "hdaheahfani1233",
        messagePreference: "sms",
        userType: "passenger",
        phone: "977437839373",
      })
    );
  },
};

export const fakeNotificationModel = {
  create: async (
    notificationObj: NotificationObjI
  ): Promise<NotificationModel> => {
    return NotificationModel.build(notificationObj);
  },
  update: async (options: unknown): Promise<void> => {
    // no implementation
  },

  findOne: async (options: unknown): Promise<NotificationModel> => {
    const user = UserModel.build({
      deviceId: "hdaheahfani1233",
      messagePreference: "sms",
      userType: "passenger",
      phone: "977437839373",
    });
    return Promise.resolve(
      NotificationModel.build({
        recipientId: user.id,
        lastRecipientId: user.id,
        recipientType: "passenger",
        message: "$199 promo code is yours!",
      })
    );
  },
};
