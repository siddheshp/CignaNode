import { SequelizeModuleOptions } from '@nestjs/sequelize';

export function getSequelizeConfig(): SequelizeModuleOptions {
    const host = process.env.DB_HOST ?? 'localhost';
    const port = Number(process.env.DB_PORT ?? 1521);
    const serviceName = process.env.DB_SERVICE_NAME ?? 'XEPDB1';
    const username = process.env.DB_USERNAME ?? 'trainingTest';
    const password = process.env.DB_PASSWORD ?? 'training123';

    // Oracle connect string format: //host:port/serviceName
    const connectString = `//${host}:${port}/${serviceName}`;

    return {
        dialect: 'oracle',
        // dialectModule: require('sequelize-oracle'),
        dialectOptions: {
            connectString,
            // lib: 'oracledb',
        },
        username,
        password,
        models: [],             // we’ll add models in AppModule
        autoLoadModels: true,   // dev convenience: creates tables if missing
        synchronize: true,      // dev only. Use proper migrations for prod.
        logging: false,
    };
}