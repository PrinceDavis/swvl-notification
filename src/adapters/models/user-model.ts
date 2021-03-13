import { Model, DataTypes } from "sequelize";

import { database } from "../database";
/**
 * Handles manipulation of data in users database table
 */
export class UserModel extends Model {
  messagePreference!: "sms" | "push"; // store how users should be reached
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  deviceId!: string;
  userType!: string;
  phone!: string;
  id!: string;
}
UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    messagePreference: {
      type: DataTypes.ENUM({
        values: ["sms", "push"],
      }),
      allowNull: false,
    },
    userType: {
      type: DataTypes.ENUM({
        values: ["driver", "passenger"],
      }),
      allowNull: false,
    },
    deviceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: database,
    tableName: "users",
    indexes: [
      {
        fields: ["id"],
        name: "user_id_index",
        unique: true,
      },
      {
        fields: ["deviceId"],
        name: "user_device_id_index",
        unique: true,
      },
      {
        fields: ["userType"],
        name: "user_type_index",
        unique: true,
      },
    ],
  }
);
