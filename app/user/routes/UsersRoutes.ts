import { Request, Response } from "express";
import { UserController } from "../controllers/UsersControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";

export class UserRouters extends BaseRouter<UserController> {
    constructor(){
        super(UserController)
    }

    routes(): void {
        this.router.get("/users", (req:Request, res:Response) => this.controller.getUser(req,res))
        
        this.router.get("/user/:id", (req:Request, res:Response) => this.controller.getUserByID(req,res))

        this.router.post("/createUser", (req:Request, res:Response) => this.controller.postCreateUser(req,res))
        
        this.router.put("/updateUser/:id", (req:Request, res:Response) => this.controller.updateUser(req,res))

        this.router.delete("/updateUser/:id", (req:Request, res:Response) => this.controller.deleteUser(req,res))
    }
}