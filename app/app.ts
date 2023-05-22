import "reflect-metadata"
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { DotenvConfig } from '../config/ConfigEnvs'

import { UserRouters } from './user/routes/UsersRoutes'
import { CategoryRouters } from "./category/routes/CategoriesRoutes"
import { CustomerRouters } from "./customer/routes/CustomerRoutes"
import { ProductRouters } from "./product/routes/ProductRoutes"
import { PurchaseRouters } from "./purchase/routes/PurchaseRoutes"
import { PurchaseProductRouters } from "./purchase/routes/PurchaseProductsRoutes"

class AppServer extends DotenvConfig {
    public app: express.Application = express()
    private port: number = this.getNumberEnv("PORT") || 5000;

    constructor(){
        super()
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))

        this.dbConnect
        
        this.app.use(morgan("dev"))
        this.app.use(cors())

        this.app.use('/api', this.routers())
        this.listen()
    }
 
    routers(): Array<express.Router> {
        return [
            new UserRouters().router, 
            new CategoryRouters().router, 
            new CustomerRouters().router, 
            new ProductRouters().router,
            new PurchaseRouters().router,
            new PurchaseProductRouters().router
        ]
    }
    
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listened in port:${this.port}`)
        })
    }
}

new AppServer()