import { createContainer, asValue, asClass } from "awilix";

import { NotificationModel, UserModel } from "../../adapters/models";
import { ScheduleNotification } from "../../usescases";
import {
  NotificationRepository,
  UserRepository,
} from "../../adapters/repositories";

export const diContainer = createContainer();

diContainer.register({
  notificationRepository: asClass(NotificationRepository).singleton(),
  scheduleNotification: asClass(ScheduleNotification).singleton(),
  userRepository: asClass(UserRepository).singleton(),
  notificationModel: asValue(NotificationModel),
  userModel: asValue(UserModel),
});
