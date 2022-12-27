import { Request, Response } from "express";
import { UserController } from "../controllers/UsersControllers";
import { BaseRouter } from "../../shared/router/BaseRouter";

export class UserRouters extends BaseRouter<UserController> {
    constructor(){
        super(UserController)
    }

    routes(): void {
        this.router.get("/users", (req:Request, res:Response) => this.controller.getUser(req,res))
    }
}