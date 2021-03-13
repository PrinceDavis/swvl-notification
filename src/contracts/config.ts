export interface ServerI {
    jwt_secret: string;
    port: number;
    type: string;
    env: string;
}

export interface DBI {
    dialect: 'mysql' | 'postgres' | 'sqlite';
    username: string;
    password: string;
    database: string;
    test_db: string;
    host: string;
}


export interface ConfigI {
    server: ServerI;
    db: DBI;
}