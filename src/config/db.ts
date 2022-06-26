import { DataSource } from 'typeorm';
import { User } from '../entities';

const defaultConfig = {
    pghost: "localhost",
    pgport: 5432,
    pgdatabase: "testdb",
    pguser: "postgres",
    pgpassword: "postgres"
}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST || defaultConfig.pghost,
    port:  process.env.PGPORT === undefined ? defaultConfig.pgport : +process.env.PGPORT,
    username: process.env.PGUSER || defaultConfig.pguser,
    password: process.env.PGPASSWORD || defaultConfig.pgpassword,
    database: process.env.PGDATABASE || defaultConfig.pgdatabase,
    synchronize: true,
    logging: process.env.NODE_ENV === "development" ? true : false,
    entities: [User],
    subscribers: [],
    migrations: [],
})