import { NotificationObjI } from "../contracts/notification";
import { UserObjectI } from "../contracts/user";
import { UseCase } from "./usecase";
import {
  NotificationRepositoryI,
  UserRepositoryI,
} from "../adapters/repositories";

interface ArgI {
  notificationRepository: NotificationRepositoryI;
  userRepository: UserRepositoryI;
}

interface ExecuteArgI {
  notificationObj: NotificationObjI;
  userObj?: UserObjectI;
}
export class ScheduleNotification extends UseCase {
  private notificationRepository: NotificationRepositoryI;
  private userRepository: UserRepositoryI;

  constructor({ notificationRepository, userRepository }: ArgI) {
    super();
    this.notificationRepository = notificationRepository;
    this.userRepository = userRepository;
  }

  async execute({ userObj, notificationObj }: ExecuteArgI): Promise<void> {
    const { SUCCESS, ERROR, DATABASE_ERROR } = this.events;
    try {
      let user;
      if (userObj) {
        user = await this.userRepository.add(userObj);
      }
      notificationObj.recipientId = user?.id || notificationObj.recipientId;
      const notification = await this.notificationRepository.add(
        notificationObj
      );
      this.emit(SUCCESS, notification.toJSON());
    } catch (ex) {
      if (ex.type === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      } else {
        this.emit(ERROR, ex);
      }
    }
  }
}

ScheduleNotification.setEvents(["SUCCESS", "ERROR", "DATABASE_ERROR"]);
