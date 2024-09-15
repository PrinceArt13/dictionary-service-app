import { DataSource } from 'typeorm';
import { join } from 'path';
import * as dotenv from "dotenv";

dotenv.config();

export default new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    schema: "DictionaryServiceDB",
    entities: [join('./dist/src/entities', '**', '*.{ts,js}')],
    migrations: [join(__dirname, 'migrations/*.{ts,js}')],
});