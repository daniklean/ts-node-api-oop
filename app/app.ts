import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { UserRouters } from './user/routes/UsersRoutes'
import { DotenvConfig } from '../config/ConfigEnvs'
import { DataSource } from 'typeorm'

class AppServer extends DotenvConfig {
    public app: express.Application = express()
    private port: number = this.getNumberEnv("PORT") || 5000;

    constructor(){
        super()
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))

        this.dbConnect()
        
        this.app.use(morgan("dev"))
        this.app.use(cors())

        this.app.use('/api', this.routers())
        this.listen()
    }
 
    routers(): Array<express.Router> {
        return [new UserRouters().router]
    }
    
   async dbConnect() {
        try {
            const source = await new DataSource(this.typeORMConfig).initialize()
            console.log(` Database Connected: Active MySQL`)
            return source
        } catch (e:any) {
            console.log(`Database Don't Connected: ${e}`)
        }
   }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listened in port:${this.port}`)
        })
    }
}

new AppServer()