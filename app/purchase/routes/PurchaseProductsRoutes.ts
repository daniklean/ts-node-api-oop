import { Request, Response } from "express";
import { PurchaseProductControllers } from "../controllers/PurchaseProductControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";

export class PurchaseProductRouters extends BaseRouter<PurchaseProductControllers> {
    constructor(){
        super(PurchaseProductControllers)
    }

    routes(): void {
        this.router.get("/purchasesProducts", (req:Request, res:Response) => this.controller.getPurchasesProducts(req,res))
        
        this.router.get("/purchaseProduct/:id", (req:Request, res:Response) => this.controller.getPurchaseProductByID(req,res))

        this.router.post("/createPurchaseProduct", (req:Request, res:Response) => this.controller.postCreatePurchaseProduct(req,res))
        
        this.router.put("/updatePurchaseProduct/:id", (req:Request, res:Response) => this.controller.updatePurchaseProduct(req,res))

        this.router.delete("/detelePurchaseProduct/:id", (req:Request, res:Response) => this.controller.deletePurchaseProduct(req,res))
    }
}