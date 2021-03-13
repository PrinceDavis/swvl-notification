import {sequelizeConfig} from '../../src/adapters/sequelizer';

describe('sequelizeConfig', () => {
    test('properties are objects', () => {
        expect(sequelizeConfig.development).toBeInstanceOf(Object);
        expect(sequelizeConfig.production).toBeInstanceOf(Object);
        expect(sequelizeConfig.test).toBeInstanceOf(Object);
    });

    test('sequelizeConfig.proudction: values exist', () => {
        expect(sequelizeConfig.production.password).toEqual(process.env.DB_PASSWORD);
        expect(sequelizeConfig.production.password).toEqual(process.env.DB_PASSWORD);
        expect(sequelizeConfig.production.dialect).toEqual(process.env.DB_DIALECT);
        expect(sequelizeConfig.production.database).toEqual(process.env.DB_NAME);
        expect(sequelizeConfig.production.username).toEqual(process.env.DB_USER);
        expect(sequelizeConfig.production.host).toEqual(process.env.DB_HOST);
    });

    test('sequelizeConfig.development: values exist', () => {
        expect(sequelizeConfig.development.password).toEqual(process.env.DB_PASSWORD);
        expect(sequelizeConfig.development.password).toEqual(process.env.DB_PASSWORD);
        expect(sequelizeConfig.development.dialect).toEqual(process.env.DB_DIALECT);
        expect(sequelizeConfig.development.database).toEqual(process.env.DB_NAME);
        expect(sequelizeConfig.development.username).toEqual(process.env.DB_USER);
        expect(sequelizeConfig.development.host).toEqual(process.env.DB_HOST);
    });

    test('sequelizeConfig.test: values exist', () => {
        expect(sequelizeConfig.test.password).toEqual(process.env.TEST_DB_PASSWORD);
        expect(sequelizeConfig.test.username).toEqual(process.env.TEST_DB_USER);
        expect(sequelizeConfig.test.database).toEqual(process.env.TEST_DB_NAME);
    });
})