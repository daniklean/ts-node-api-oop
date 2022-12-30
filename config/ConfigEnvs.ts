import * as dotenv from 'dotenv'
import { DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { DataSource } from 'typeorm'

export abstract class DotenvConfig {
    constructor(){

        const nameNodeEnv = this.createPathEnv(this.nodeEnv)
        dotenv.config({
            path: nameNodeEnv,
        })
    } 

    public getEnvironment(k: string): string | undefined {
        return process.env[k]
    }

    public getNumberEnv(k: string): number {
        return Number(this.getEnvironment(k))
    }

    public get nodeEnv(): string {
        return this.getEnvironment('NODE_ENV')?.trim() || ""
    }

    public createPathEnv(path: string): string {
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
            host: this.getEnvironment('DB_HOST'),
            port: this.getNumberEnv('DB_PORT'),
            username: this.getEnvironment('DB_USER'),
            password: this.getEnvironment('DB_PASSWORD'),
            database: this.getEnvironment('DB_DATABASE'),
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
            synchronize: false,
            logging:false, 
            namingStrategy: new SnakeNamingStrategy(),
        }
    }

    async dbConnect(): Promise<DataSource | void>  {
        try {
            const source = (await (await new DataSource(this.typeORMConfig)).initialize())

            const connected = source.isInitialized
            console.log(source.isInitialized!)

            if(connected === true){
                console.log(` Database Connected: Active MySQL`)
                return source
            }
        } catch (error: any) {
            console.log(`Problem with Database Don't connected: ${error}`)
        }
   }
}
