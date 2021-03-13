import { Options } from "sequelize";

import { config } from "./config";

interface ConfigI {
  [key: string]: Options;
  development: Options;
  production: Options;
  test: Options;
}

const dbConfig: Options = {
  password: config.db.password,
  username: config.db.username,
  database: config.db.database,
  dialect: config.db.dialect,
  host: config.db.host,
};

export const sequelizeConfig: ConfigI = {
  development: dbConfig,
  production: dbConfig,
  test: {
    password: config.db.test_db_password,
    username: config.db.test_db_user,
    database: config.db.test_db_name,
    dialect: config.db.dialect,
    host: config.db.host,
  },
};
