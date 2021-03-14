import {
  NotificationRepositoryI,
  UserRepositoryI,
} from "../adapters/repositories";

export interface NotificationObjI {
  recipientType?: "driver" | "passenger";
  recipientId?: string;
  message: string;
}

export interface ArgI {
  notificationRepository: NotificationRepositoryI;
  userRepository: UserRepositoryI;
}
