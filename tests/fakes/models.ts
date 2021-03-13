import { UserObjectI } from "../../src/contracts/user";
import { UserModel } from "../../src/adapters/models";

export const fakeUserModel = {
  create: async (user: UserObjectI): Promise<UserModel> => {
    return UserModel.build(user);
  },
  findAll: (options: unknown): Promise<UserModel[]> => {
    return Promise.resolve([
      UserModel.build({
        deviceId: "hdaheahfani1233",
        messagePreference: "sms",
        userType: "passenger",
        phone: "977437839373",
      }),
    ]);
  },

  findOne: (options: unknown): Promise<UserModel> => {
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
