import { Request, Response } from "express";
import { UserController } from "../controllers/UsersControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";
import { UserMiddleware } from "../middlewares/user.middleware";

export class UserRouters extends BaseRouter<UserController, UserMiddleware> {
    constructor(){
        super(UserController, UserMiddleware)
    }

    routes(): void {
        this.router.get("/users", (req:Request, res:Response) => this.controller.getUser(req,res))
        
        this.router.get("/user/:id", (req:Request, res:Response) => this.controller.getUserByID(req,res))

        this.router.get("/userCustomer/:id", (req:Request, res:Response) => this.controller.getUserWithRelationById(req,res))

        this.router.post("/createUser", (req,res,next) => [this.middleware.userValidate(req,res,next)], (req:Request, res:Response) => this.controller.postCreateUser(req,res))
        
        this.router.put("/updateUser/:id", (req:Request, res:Response) => this.controller.updateUser(req,res))

        this.router.delete("/deteleUser/:id", (req:Request, res:Response) => this.controller.deleteUser(req,res))
    }
}