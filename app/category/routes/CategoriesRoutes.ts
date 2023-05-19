import { Request, Response } from "express";
import { CategoryController } from "../controllers/CategoryControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";

export class CategoryRouters extends BaseRouter<CategoryController> {
    constructor(){
        super(CategoryController)
    }

    routes(): void {
        this.router.get("/categories", (req:Request, res:Response) => this.controller.getCategories(req,res))
        
        this.router.get("/category/:id", (req:Request, res:Response) => this.controller.getCategoryByID(req,res))

        this.router.post("/createCategory", (req:Request, res:Response) => this.controller.postCreateCategory(req,res))
        
        this.router.put("/updateCategory/:id", (req:Request, res:Response) => this.controller.updateCategory(req,res))

        this.router.delete("/deleteCategory/:id", (req:Request, res:Response) => this.controller.deleteCategory(req,res))
    }
}