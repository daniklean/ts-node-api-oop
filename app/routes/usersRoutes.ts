import { Request, Response } from "express";
import { userController } from "../controllers/usersControllers";
import { basicRouter } from "./routes";

export class userRouters extends basicRouter<userController> {
    constructor(){
        super(userController)
    }

    routes(): void {
        this.router.get("/users", (req, res) => this.controller.getUser(req,res))
    }
}