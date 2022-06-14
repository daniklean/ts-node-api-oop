import { Request, Response } from 'express'

export class UserController {
    getUser(req: Request, res:Response) {
        res.status(200).json({user: "Luis Daniel"})
    }
}