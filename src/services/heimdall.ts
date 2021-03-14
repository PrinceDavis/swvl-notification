import { schedule } from "node-cron";

import { ArgI } from "../contracts/notification";
import { Messenger } from "./messenger";
import {
  NotificationRepositoryI,
  UserRepositoryI,
} from "../adapters/repositories";
import { NotificationModel, UserModel } from "../adapters/models";

interface ConstructorArgI extends ArgI {
  messenger: Messenger;
}
export class Heimdall {
  private notificationRepository: NotificationRepositoryI;
  private userRepository: UserRepositoryI;
  private messenger: Messenger;

  constructor({
    notificationRepository,
    userRepository,
    messenger,
  }: ConstructorArgI) {
    this.notificationRepository = notificationRepository;
    this.userRepository = userRepository;
    this.messenger = messenger;
  }

  private async fetchNotification(): Promise<NotificationModel> {
    let notification = await this.notificationRepository.fetchUnfinished();
    if (!notification) {
      notification = await this.notificationRepository.next();
    }
    return notification;
  }

  private async getRecievers(
    notification: NotificationModel
  ): Promise<UserModel[]> {
    let recievers = [notification?.recipient];
    if (!recievers[0]) {
      // Notification doesn't have a recipient
      // Therefore it is for all user of a certain type
      recievers = await this.userRepository.findFrom({
        lastRecipientId: Number(notification.lastRecipientId),
        userType: notification.recipientType,
      });
    }
    return recievers;
  }

  private async updateNotification(
    recievers: UserModel[],
    notification: NotificationModel
  ): Promise<void> {
    if (notification.recipient) {
      await this.notificationRepository.update(notification.id, {
        status: "processing",
      });
      return;
    }
    if (!recievers.length) {
      // last user has recieved this notification
      await this.notificationRepository.update(notification.id, {
        status: "done",
      });
    } else {
      // Some users has not gotten this notification
      await this.notificationRepository.update(notification.id, {
        status: "processing",
        lastRecipientId: recievers[recievers.length - 1].id,
      });
    }
  }

  watch(): void {
    schedule("* * * * *", async () => {
      try {
        const notification = await this.fetchNotification();
        if (!notification) {
          console.log("Heimdall has nothing to do this cycle");
          return;
        }
        const recievers = await this.getRecievers(notification);
        await this.updateNotification(recievers, notification);
        if (!recievers.length) {
          console.log("Heimdall has nothing to do this cycle");
          return;
        }
        // send messages to recievers
        await this.messenger.handleMessage(recievers, notification);
      } catch (ex) {
        console.log("Heimdall crashed");
        console.log(ex);
        process.exit(1);
      }
    });
    console.log("watching");
  }
}
