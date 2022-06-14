import { Request, Response } from "express";
import { UserController } from "../controllers/usersControllers";
import { BasicRouter } from "./routes";

export class UserRouters extends BasicRouter<UserController> {
    constructor(){
        super(UserController)
    }

    routes(): void {
        this.router.get("/users", (req, res) => this.controller.getUser(req,res))
    }
}