import { UserObjectI } from "../../contracts/user";
import { UserModel } from "../models/user-model";
import { Op } from "sequelize";

interface FindFromI {
  lastRecipientId: number;
  userType: string;
  limit?: number;
}

interface UserModelI {
  findOrCreate(option: unknown): Promise<[UserModel, string]>;
  findAll(options: unknown): Promise<UserModel[]>;
  findOne(arg: unknown): Promise<UserModel>;
}

export interface UserRepositoryI {
  findFrom({
    lastRecipientId,
    userType,
    limit,
  }: FindFromI): Promise<UserModel[]>;
  findByDeviceId(deviceId: string): Promise<UserModel>;
  add(userObj: UserObjectI): Promise<UserModel>;
}

export class UserRepository implements UserRepositoryI {
  private model: UserModelI;
  constructor({ userModel }: { userModel: UserModelI }) {
    this.model = userModel;
  }

  async add(userObj: UserObjectI): Promise<UserModel> {
    try {
      const [user] = await this.model.findOrCreate({
        where: { deviceId: userObj.deviceId },
        defaults: userObj,
      });
      return user;
    } catch (ex) {
      ex.type = "DatabaseError";
      if (ex.errors) {
        ex.message = ex.errors[0];
        delete ex.message.instance;
      }
      throw ex;
    }
  }
  async findFrom({
    lastRecipientId,
    userType,
    limit,
  }: FindFromI): Promise<UserModel[]> {
    limit = limit || 10;
    return this.model.findAll({
      limit,
      where: {
        userType,
        id: { [Op.gt]: lastRecipientId },
      },
    });
  }
  async findByDeviceId(deviceId: string): Promise<UserModel> {
    return this.model.findOne({ where: { deviceId } });
  }
}
