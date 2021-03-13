import joi from "joi";

import { DBI } from "../../../contracts/config";

const schema = joi
  .object({
    TEST_DB_PASSWORD: joi.string().required(),
    TEST_DB_USER: joi.string().required(),
    TEST_DB_NAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DIALECT: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_HOST: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value } = schema.validate(process.env);

if (error) throw new Error(`Config validation failed ${error.message}`);

export const db: DBI = {
  test_db_password: value.TEST_DB_PASSWORD,
  test_db_name: value.TEST_DB_NAME,
  test_db_user: value.TEST_DB_USER,
  password: value.DB_PASSWORD,
  dialect: value.DB_DIALECT,
  username: value.DB_USER,
  database: value.DB_NAME,
  host: value.DB_HOST,
};
