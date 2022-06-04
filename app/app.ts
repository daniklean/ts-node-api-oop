import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

class appServer {
    public app: express.Application = express()
    private port: number = 8000

    constructor(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(morgan("dev"))
        this.app.use(cors())
        this.listen()
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listened in port:${this.port}`)
        })
    }
}

new appServer()