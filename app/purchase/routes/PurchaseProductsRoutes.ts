import { NextFunction, Request, Response } from "express";
import { PurchaseProductControllers } from "../controllers/PurchaseProductControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";
import { PurchaseProductMiddleware } from "../middlewares/purchase_product.middleware";

export class PurchaseProductRouters extends BaseRouter<PurchaseProductControllers, PurchaseProductMiddleware> {
    constructor(){
        super(PurchaseProductControllers, PurchaseProductMiddleware)
    }

    routes(): void {
        this.router.get("/pp/purchases-products", 
        (req:Request, res:Response) => 
        this.controller.getPurchasesProducts(req,res))
        
        this.router.get("/pp/purchase-product/:id", 
        (req:Request, res:Response) => 
        this.controller.getPurchaseProductByID(req,res))

        this.router.post("/pp/create-purchase-product", 
        (req: Request,res: Response,next: NextFunction) => 
        [(this.middleware.purchaseProductValidate(req,res,next))],
        (req:Request, res:Response) => 
        this.controller.postCreatePurchaseProduct(req,res))
        
        this.router.put("/pp/update-purchase-product/:id", 
        (req:Request, res:Response) => 
        this.controller.updatePurchaseProduct(req,res))

        this.router.delete("/pp/delete-purchase-product/:id", (
        req:Request, res:Response) => 
        this.controller.deletePurchaseProduct(req,res))
    }
}