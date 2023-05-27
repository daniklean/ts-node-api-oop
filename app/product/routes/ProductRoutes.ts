import { NextFunction, Request, Response } from "express";
import { ProductControllers } from "../controllers/ProductControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";
import { ProductMiddleware } from "../middlewares/product.middleware";

export class ProductRouters extends BaseRouter<ProductControllers, ProductMiddleware> {
    constructor(){
        super(ProductControllers, ProductMiddleware)
    }

    routes(): void {
        this.router.get("/products", 
        (req:Request, res:Response) => 
        this.controller.getProducts(req,res))
        
        this.router.get("/products/:id", 
        (req:Request, res:Response) => 
        this.controller.getProductByID(req,res))

        this.router.post("/products", 
        (req: Request, res: Response, next: NextFunction) =>
        [(this.middleware.productValidate(req,res,next))],
        (req:Request, res:Response) => 
        this.controller.createProduct(req,res))
        
        this.router.put("/products/:id", 
        (req:Request, res:Response) => 
        this.controller.updateProduct(req,res))

        this.router.delete("/products/:id", 
        (req:Request, res:Response) => 
        this.controller.deleteProduct(req,res))
    }
}