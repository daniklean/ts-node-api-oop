import { Request, Response } from "express";
import { CustomerController } from "../controllers/CustomerControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";

export class CustomerRouters extends BaseRouter<CustomerController> {
    constructor(){
        super(CustomerController)
    }

    routes(): void {
        this.router.get("/customers", (req:Request, res:Response) => this.controller.getCustomers(req,res))
        
        this.router.get("/customer/:id", (req:Request, res:Response) => this.controller.getCustomerByID(req,res))

        this.router.get("/customerUser/:id", (req:Request, res:Response) => this.controller.getUserWithRelationById(req,res))

        this.router.post("/createCustomer", (req:Request, res:Response) => this.controller.postCreateCustomer(req,res))
        
        this.router.put("/updateCustomer/:id", (req:Request, res:Response) => this.controller.updateCustomer(req,res))

        this.router.delete("/deleteCustomer/:id", (req:Request, res:Response) => this.controller.deleteCustomer(req,res))
    }
}