import * as dotenv from 'dotenv'

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
}