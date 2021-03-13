import { UserObjectI } from "../../contracts/user";
import { UserModel } from "../models/user-model";
import { Op } from "sequelize";

export interface UserRepositoryI {
  findFrom(
    lastRecipientId: number,
    userType: string,
    limit: number
  ): Promise<UserModel[]>;
  findByDeviceId(deviceId: string): Promise<UserModel>;
  add(userObj: UserObjectI): Promise<UserModel>;
}

export interface UserModelI {
  create(user: UserObjectI): Promise<UserModel>;
  findAll(options: unknown): Promise<UserModel[]>;
  findOne(arg: unknown): Promise<UserModel>;
}

export class UserRepository implements UserRepositoryI {
  private model: UserModelI;
  constructor({ userModel }: { userModel: UserModelI }) {
    this.model = userModel;
  }

  async add(userObj: UserObjectI): Promise<UserModel> {
    try {
      const user = await this.model.create(userObj);
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
  async findFrom(
    lastRecipientId: number,
    userType: string,
    limit = 10
  ): Promise<UserModel[]> {
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
