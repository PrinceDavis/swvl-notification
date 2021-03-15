export interface ServerI {
  port: number;
  type: string;
  env: string;
}

export interface DBI {
  dialect: "mysql" | "postgres" | "sqlite";
  test_db_password: string;
  test_db_name: string;
  test_db_user: string;
  redis_url: string;
  username: string;
  password: string;
  database: string;
  host: string;
}

export interface ConfigI {
  server: ServerI;
  db: DBI;
}
