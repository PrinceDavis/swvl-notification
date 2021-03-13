import { Sequelize } from "sequelize";

import { sequelizeConfig } from "./sequelizer";
import { config } from "./config";

const env: string = config.server.env;
const sConfig = sequelizeConfig[env];
sConfig.logging = false;

export const database = new Sequelize(
  <string>sConfig.database,
  <string>sConfig.username,
  <string>sConfig.password,
  sConfig
);
