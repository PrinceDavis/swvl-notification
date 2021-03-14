import { NotificationObjI } from "../../contracts/notification";
import { NotificationModel } from "../models";
import { Op } from "sequelize";

interface ModelI {
  create(notificationObj: NotificationObjI): Promise<NotificationModel>;
  update(input: unknown, options: unknown): Promise<void>;
  findOne(arg: unknown): Promise<NotificationModel>;
}

export interface NotificationRepositoryI {
  add(notificationObj: NotificationObjI): Promise<NotificationModel>;
  updateLastRecipient(id: string, recipientId: number): Promise<void>;
  fetchUnfinished(): Promise<NotificationModel>;
  next(): Promise<NotificationModel>;
}

export class NotificationRepository implements NotificationRepositoryI {
  private model: ModelI;

  constructor({ notificationModel }: { notificationModel: ModelI }) {
    this.model = notificationModel;
  }

  async add(input: NotificationObjI): Promise<NotificationModel> {
    try {
      const notification = await this.model.create(input);
      return notification;
    } catch (ex) {
      ex.type = "DatabaseError";
      if (ex.errors) {
        ex.message = ex.errors[0];
        delete ex.message.instance;
      }
      throw ex;
    }
  }

  async updateLastRecipient(id: string, recipientId: number): Promise<void> {
    try {
      await this.model.update(
        {
          lastRecipientId: recipientId,
        },
        {
          where: { id },
        }
      );
    } catch (ex) {
      ex.type = "DatabaseError";
      if (ex.errors) {
        ex.message = ex.errors[0];
        delete ex.message.instance;
      }
      throw ex;
    }
  }

  fetchUnfinished(): Promise<NotificationModel> {
    return this.model.findOne({
      where: {
        status: "processing",
        lastRecipientId: { [Op.ne]: null },
      },
    });
  }

  next(): Promise<NotificationModel> {
    return this.model.findOne({
      where: {
        status: "scheduled",
      },
    });
  }
}
