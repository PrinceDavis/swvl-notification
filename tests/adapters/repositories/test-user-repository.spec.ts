import { UserModel } from "../../../src/adapters/models";
import { fakeUserModel } from "../../fakes/models";
import {
  UserRepositoryI,
  UserRepository,
} from "../../../src/adapters/repositories";

describe("UserRepository", () => {
  let userRepository: UserRepositoryI;
  beforeAll(() => {
    userRepository = new UserRepository({ userModel: fakeUserModel });
  });

  test("add: returns a User entity", async () => {
    const user = await userRepository.add({
      deviceId: "hdaheahfani1233",
      messagePreference: "sms",
      userType: "passenger",
      phone: 977437839373,
    });
    expect(user).toBeInstanceOf(UserModel);
  });
  test("findFrom: returns an array of User entity", async () => {
    const users = await userRepository.findFrom({
      userType: "passenger",
      lastRecipientId: 2,
    });
    expect(users[0]).toBeInstanceOf(UserModel);
  });

  test("findFrom: returns an array of User entity", async () => {
    const user = await userRepository.findByDeviceId("jdjdh");
    expect(user).toBeInstanceOf(UserModel);
  });
});
