import { Request, Response } from "express";
import { ProductControllers } from "../controllers/ProductControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";

export class UserRouters extends BaseRouter<ProductControllers> {
    constructor(){
        super(ProductControllers)
    }

    routes(): void {
        this.router.get("/products", (req:Request, res:Response) => this.controller.getProducts(req,res))
        
        this.router.get("/product/:id", (req:Request, res:Response) => this.controller.getProductByID(req,res))

        this.router.post("/createProduct", (req:Request, res:Response) => this.controller.postCreateProduct(req,res))
        
        this.router.put("/updateProduct/:id", (req:Request, res:Response) => this.controller.updateProduct(req,res))

        this.router.delete("/deteleProduct/:id", (req:Request, res:Response) => this.controller.deleteProduct(req,res))
    }
}