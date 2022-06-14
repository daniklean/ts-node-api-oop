import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { userRouters } from './routes/usersRoutes'
import { dotenvConfig } from '../config/configEnvs'
import { DataSource } from 'typeorm'

class appServer extends dotenvConfig {
    public app: express.Application = express()
    private port: number = this.getNumberEnv("PORT") || 5000;

    constructor(){
        super();
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))

        this.dbConnect()
        
        this.app.use(morgan("dev"))
        this.app.use(cors())

        this.app.use('/api', this.routers())
        this.listen()
    }

    routers(): Array<express.Router> {
        return [new userRouters().router]
    }
    
    async dbConnect(): Promise<DataSource> { 
        return await new DataSource(this.typeORMConfig).initialize(); 
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listened in port:${this.port}`)
        })
    }
}

new appServer()