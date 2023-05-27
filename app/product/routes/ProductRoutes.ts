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
        
        this.router.get("/product/product/:id", 
        (req:Request, res:Response) => 
        this.controller.getProductByID(req,res))

        this.router.post("/product/create-product", 
        (req: Request, res: Response, next: NextFunction) =>
        [(this.middleware.productValidate(req,res,next))],
        (req:Request, res:Response) => 
        this.controller.postCreateProduct(req,res))
        
        this.router.put("/product/update-product/:id", 
        (req:Request, res:Response) => 
        this.controller.updateProduct(req,res))

        this.router.delete("/product/detele-product/:id", 
        (req:Request, res:Response) => 
        this.controller.deleteProduct(req,res))
    }
}