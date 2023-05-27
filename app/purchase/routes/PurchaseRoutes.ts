import { NextFunction, Request, Response } from "express";
import { PurchaseControllers } from "../controllers/PurchaseControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";
import { PurchaseMiddleware } from "../middlewares/purchase.middleware";

export class PurchaseRouters extends BaseRouter<PurchaseControllers, PurchaseMiddleware> {
    constructor(){
        super(PurchaseControllers, PurchaseMiddleware)
    }

    routes(): void {
        this.router.get("/purchases", 
        (req:Request, res:Response) => 
        this.controller.getPurchases(req,res))
        
        this.router.get("/purchase/purchase/:id", 
        (req:Request, res:Response) => 
        this.controller.getPurchaseByID(req,res))

        this.router.post("/purchase/create-purchase", 
        (req: Request,res: Response, next: NextFunction) => 
        [(this.middleware.purchaseValidate(req,res,next))],
        (req:Request, res:Response) => 
        this.controller.postCreatePurchase(req,res))
        
        this.router.put("/purchase/update-purchase/:id", 
        (req:Request, res:Response) => 
        this.controller.updatePurchase(req,res))

        this.router.delete("/purchase/detele-purchase/:id", 
        (req:Request, res:Response) => 
        this.controller.deletePurchase(req,res))
    }
}