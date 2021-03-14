import { ArgI, NotificationObjI } from "../contracts/notification";
import { UserObjectI } from "../contracts/user";
import { UseCase } from "./usecase";
import {
  NotificationRepositoryI,
  UserRepositoryI,
} from "../adapters/repositories";

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
    const { SUCCESS, ERROR, DATABASE_ERROR, BAD_PARAMETERS } = this.events;
    try {
      let user;
      if (userObj) {
        user = await this.userRepository.add(userObj);
      }
      if (!user && !notificationObj.recipientType) {
        throw Error("BadParameter");
      }
      notificationObj.recipientId = user?.id;
      const notification = await this.notificationRepository.add(
        notificationObj
      );
      this.emit(SUCCESS, notification.toJSON());
    } catch (ex) {
      if (ex.type === "DatabaseError") {
        this.emit(DATABASE_ERROR, ex);
      } else if (ex.message === "BadParameter") {
        this.emit(BAD_PARAMETERS, {
          error: "BadParameter",
          message: "RecipientType is required when userObj is not provided",
        });
      } else {
        console.log(ex);
        this.emit(ERROR, ex);
      }
    }
  }
}

ScheduleNotification.setEvents([
  "DATABASE_ERROR",
  "BAD_PARAMETERS",
  "SUCCESS",
  "ERROR",
]);
