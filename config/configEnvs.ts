import * as dotenv from 'dotenv'
import { DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export abstract class dotenvConfig {
    constructor(){
        const nameNodeEnv = this.pathEnv(this.nodeEnv)
        dotenv.config({
            path: nameNodeEnv,
        })
    } 

    public getEnv(k: string): string | undefined {
        return process.env[k] // process.env."PORT"
    }

    public getNumberEnv(k: string): number {
        return Number(this.getEnv(k))
    }

    public get nodeEnv(): string {
        return this.getEnv('NODE_ENV')?.trim() || ""
    }

    public pathEnv(path: string): string {
        const arrEnv: Array<string> = ["env"] 

        if(path.length > 0){
            const toStringEnv = path.split(".")
            arrEnv.unshift(...toStringEnv)
        }
        return '.' + arrEnv.join('.')
    }

    public get  typeORMConfig(): DataSourceOptions {
        return {
            type: 'mysql',
            host: this.getEnv('DB_HOST'),
            port: this.getNumberEnv('DB_PORT'),
            username: this.getEnv('DB_USER'),
            password: this.getEnv('DB_PASSWORD'),
            database: this.getEnv('DB_DATABASE'),
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../migrations/+{.ts,.js}"],
            synchronize:true,
            logging:false, 
            namingStrategy: new SnakeNamingStrategy(),
        }
    }
}