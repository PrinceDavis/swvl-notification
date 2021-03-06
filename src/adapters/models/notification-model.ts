import { Model, DataTypes, UUIDV4 } from "sequelize";

import { database } from "../database";
import { UserModel } from "./user-model";
/**
 * Handles manipulation of data in notifications database table
 */
export class NotificationModel extends Model {
  status!: "scheduled" | "processing" | "done";
  recipientType!: "driver" | "passenger";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      type: DataTypes.INTEGER,
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    },
    lastRecipientId: {
      type: DataTypes.INTEGER,
    },
    recipientType: {
      type: DataTypes.ENUM({
        values: ["driver", "passenger"],
      }),
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
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
