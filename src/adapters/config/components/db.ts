import joi from "joi";

import { DBI } from "../../../contracts/config";

const schema = joi
  .object({
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
  password: value.DB_PASSWORD,
  test_db: value.TEST_DB_NAME,
  dialect: value.DB_DIALECT,
  username: value.DB_USER,
  database: value.DB_NAME,
  host: value.DB_HOST,
};
