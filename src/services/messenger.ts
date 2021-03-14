import { NotificationModel, UserModel } from "../adapters/models";
import { ArgI } from "../contracts/notification";
import {
  NotificationRepositoryI,
  UserRepositoryI,
} from "../adapters/repositories";

export class Messenger {
  private notificationRepository: NotificationRepositoryI;
  private userRepository: UserRepositoryI;

  constructor({ notificationRepository, userRepository }: ArgI) {
    this.notificationRepository = notificationRepository;
    this.userRepository = userRepository;
  }

  async handleMessage(
    recievers: UserModel[],
    notification: NotificationModel
  ): Promise<void> {
    console.log("sending messages to recievers");
    for (const reciever of recievers) {
      if (reciever.messagePreference === "push") {
        this.sendPushNote(reciever, notification);
      } else {
        this.sendSMS(reciever, notification);
      }
    }
    if (notification.recipient) {
      await this.notificationRepository.update(notification.id, {
        status: "done",
      });
    }
  }

  sendPushNote(reciever: UserModel, notification: NotificationModel): void {
    console.log(
      `${notification.message} delivered to user with device ID ${reciever.deviceId} 
       via push notification`
    );
  }
  sendSMS(reciever: UserModel, notification: NotificationModel): void {
    console.log(
      `${notification.message} delivered to user with device ID ${reciever.deviceId} via SMS`
    );
  }
}
