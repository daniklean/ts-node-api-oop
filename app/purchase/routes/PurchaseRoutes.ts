import { Request, Response } from "express";
import { PurchaseControllers } from "../controllers/PurchaseControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";

export class PurchaseRouters extends BaseRouter<PurchaseControllers> {
    constructor(){
        super(PurchaseControllers)
    }

    routes(): void {
        this.router.get("/purchases", (req:Request, res:Response) => this.controller.getPurchases(req,res))
        
        this.router.get("/purchase/:id", (req:Request, res:Response) => this.controller.getPurchaseByID(req,res))

        this.router.post("/createPurchase", (req:Request, res:Response) => this.controller.postCreatePurchase(req,res))
        
        this.router.put("/updatePurchase/:id", (req:Request, res:Response) => this.controller.updatePurchase(req,res))

        this.router.delete("/detelePurchase/:id", (req:Request, res:Response) => this.controller.deletePurchase(req,res))
    }
}