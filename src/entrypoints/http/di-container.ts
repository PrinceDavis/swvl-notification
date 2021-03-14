import { createContainer, asValue, asClass } from "awilix";

import { NotificationModel, UserModel } from "../../adapters/models";
import { ScheduleNotification } from "../../usescases";
import { database } from "../../adapters/database";
import { config } from "../../adapters/config";
import {
  NotificationRepository,
  UserRepository,
} from "../../adapters/repositories";
import { Server } from "./server";

export const diContainer = createContainer();

diContainer.register({
  notificationRepository: asClass(NotificationRepository).singleton(),
  scheduleNotification: asClass(ScheduleNotification).singleton(),
  userRepository: asClass(UserRepository).singleton(),
  notificationModel: asValue(NotificationModel),
  server: asClass(Server).singleton(),
  userModel: asValue(UserModel),
  database: asValue(database),
  config: asValue(config),
});
