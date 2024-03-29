import { NextFunction, Request, Response } from "express";
import { CategoryController } from "../controllers/CategoryControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";
import { CategoryMiddleware } from "../middlewares/category.middleware";

export class CategoryRouters extends BaseRouter<CategoryController, CategoryMiddleware> {
    constructor(){
        super(CategoryController, CategoryMiddleware)
    }

    routes(): void {
        this.router.get("/categories", 
        (req:Request, res:Response) => 
        this.controller.getCategories(req,res))
        
        this.router.get("/categories:id", 
        (req:Request, res:Response) => 
        this.controller.getCategoryByID(req,res))

        this.router.post("/categories", 
        (req: Request, res: Response, next: NextFunction) => 
        [(this.middleware.categoryValidate(req,res,next))],
        (req:Request, res:Response) => 
        this.controller.createCategory(req,res))
        
        this.router.put("/categories/:id", 
        (req:Request, res:Response) => 
        this.controller.updateCategory(req,res))

        this.router.delete("/categories/:id", 
        (req:Request, res:Response) => 
        this.controller.deleteCategory(req,res))
    }
}