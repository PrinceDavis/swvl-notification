import { Model, DataTypes, UUIDV4 } from "sequelize";

import { database } from "../database";
import { UserModel } from "./user";
/**
 * Handles manipulation of data in notifications database table
 */
export class NotificationModel extends Model {
  status!: "scheduled" | "processing" | "done";
  recipientType!: "driver" | "passenger";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  multipleRecipient!: boolean;
  lastRecipientId!: string;
  recipientId!: string;
  message!: string;
  recipient!: UserModel;
  id!: string;
}
NotificationModel.init(
  {
    id: {
      validate: { isUUID: 4 },
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    recipientId: {
      references: { model: UserModel, key: "id" },
      type: DataTypes.UUID,
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    },
    lastRecipientId: {
      type: DataTypes.UUID,
    },
    recipientType: {
      type: DataTypes.ENUM({
        values: ["driver", "passenger"],
      }),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    multipleRecipient: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM({
        values: ["scheduled", "processing", "done"],
      }),
      defaultValue: "scheduled",
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "notifications",
    indexes: [
      {
        fields: ["id"],
        name: "notification_id_index",
        unique: true,
      },
    ],
  }
);

NotificationModel.belongsTo(UserModel, {
  as: "recipient",
});