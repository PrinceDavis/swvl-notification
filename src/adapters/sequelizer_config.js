const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
    },
    test: {
        password: process.env.TEST_DB_PASSWORD,
        username: process.env.TEST_DB_USER,
        database: process.env.TEST_DB_NAME,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
    },
    production: {
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
    },
};