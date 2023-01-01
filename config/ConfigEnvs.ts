import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { initDataSource } from './base_db/data.source'

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

    protected async dbConnect(): Promise<DataSource | void> {
        try {
           const source = await initDataSource.initialize()
           const connect = source.isInitialized

           if(connect === true){
            console.log('Database Connected: Active MySQL')
           }
           return source
        } catch (error:any) {
            console.log(`Problem with Database don't connected: ${error}`)
        }
    }
}
