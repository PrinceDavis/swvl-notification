import { config } from "../../src/adapters/config";

describe("config", () => {
  test("has db object", () => {
    expect(config.db).toBeInstanceOf(Object);
  });
  test("has valid value for db", () => {
    expect(config.db.test_db_password).toEqual(process.env.TEST_DB_PASSWORD);
    expect(config.db.test_db_name).toEqual(process.env.TEST_DB_NAME);
    expect(config.db.test_db_user).toEqual(process.env.TEST_DB_USER);
    expect(config.db.password).toEqual(process.env.DB_PASSWORD);
    expect(config.db.password).toEqual(process.env.DB_PASSWORD);
    expect(config.db.redis_url).toEqual(process.env.REDIS_URL);
    expect(config.db.dialect).toEqual(process.env.DB_DIALECT);
    expect(config.db.database).toEqual(process.env.DB_NAME);
    expect(config.db.username).toEqual(process.env.DB_USER);
    expect(config.db.host).toEqual(process.env.DB_HOST);
  });

  test("has server object", () => {
    expect(config.db).toBeInstanceOf(Object);
  });

  test("has valid value for server", () => {
    expect(config.server.type).toEqual(process.env.PROCESS_TYPE);
    expect(config.server.port).toEqual(Number(process.env.PORT));
    expect(config.server.env).toEqual(process.env.NODE_ENV);
  });
});
