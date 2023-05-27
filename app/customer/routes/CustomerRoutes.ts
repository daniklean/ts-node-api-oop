import { NextFunction, Request, Response } from "express";
import { CustomerController } from "../controllers/CustomerControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";
import { CustomerMiddleware } from "../middlewares/customer.middleware";

export class CustomerRouters extends BaseRouter<CustomerController, CustomerMiddleware> {
    constructor(){
        super(CustomerController, CustomerMiddleware)
    }

    routes(): void {
        this.router.get("/customers", 
        (req:Request, res:Response) => 
        this.controller.getCustomers(req,res))
        
        this.router.get("/customers/:id", 
        (req:Request, res:Response) => 
        this.controller.getCustomerByID(req,res))

        this.router.get("/customers/:id/users", 
        (req:Request, res:Response) => 
        this.controller.getUserWithRelationById(req,res))

        this.router.post("/customers", 
        (req: Request, res: Response, next: NextFunction) => 
        [(this.middleware.customerValidate(req,res,next))],
        (req:Request, res:Response) => 
        this.controller.createCustomer(req,res))
        
        this.router.put("/customers/:id", 
        (req:Request, res:Response) => 
        this.controller.updateCustomer(req,res))

        this.router.delete("/customers/:id", 
        (req:Request, res:Response) => 
        this.controller.deleteCustomer(req,res))
    }
}