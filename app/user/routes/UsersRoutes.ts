import { NextFunction, Request, Response } from "express";
import { UserController } from "../controllers/UsersControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";
import { UserMiddleware } from "../middlewares/user.middleware";

export class UserRouters extends BaseRouter<UserController, UserMiddleware> {
    constructor(){
        super(UserController, UserMiddleware)
    }

    routes(): void {
        this.router.get("/users", 
        (req:Request, res:Response) => 
        this.controller.getUsers(req,res))
        
        this.router.get("/users/:id", 
        (req:Request, res:Response) => 
        this.controller.getUserByID(req,res))

        this.router.get("/users/:id/customer", 
        (req:Request, res:Response) => 
        this.controller.getUserWithRelationById(req,res))

        this.router.post("/users", 
        (req: Request,res: Response, next: NextFunction) => 
        [this.middleware.userValidate(req,res,next)], 
        (req:Request, res:Response) => 
        this.controller.createUser(req,res))
        
        this.router.put("/users/:id", 
        (req:Request, res:Response) => 
        this.controller.updateUser(req,res))

        this.router.delete("/users/:id", 
        (req:Request, res:Response) => 
        this.controller.deleteUser(req,res))
    }
}