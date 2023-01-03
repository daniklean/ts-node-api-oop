import { DataSource } from "typeorm";
import * as dotenv from "dotenv"
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({
    path: process.env.NODE_ENV !==  undefined ? `.${process.env.NODE_ENV.trim()}.env` : '.env'
})


const config : DataSourceOptions = {
    type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [__dirname + "/../../app/**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../app//migrations/*{.ts,.js}"],
            synchronize: false,
            migrationsRun: true,
            logging:false, 
            namingStrategy: new SnakeNamingStrategy(),
}


export const initDataSource : DataSource = new DataSource(config)
