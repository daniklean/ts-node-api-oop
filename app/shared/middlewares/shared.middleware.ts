import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { ResponseCodeStatus } from "../handle_Errors/http.response";
import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/dto/user.dto";

export class SharedMiddleware {
    constructor(public readonly status: ResponseCodeStatus = new ResponseCodeStatus())
    {}

    passAuth(type: string){
        return passport.authenticate(type, {session: false})
    }

    adminRole(req: Request, res: Response, next: NextFunction){
        const user = req.user as UserEntity
        if (user.role !== RoleType.ADMIN){
            return this.status.unauthorized(res, "Your don't admin for this request")
        }
        return next()
    }

    userRole(req: Request, res: Response, next: NextFunction){
        const user = req.user as UserEntity
        if (user.role !== RoleType.USER){
            return this.status.unauthorized(res, "Your don't user for this request")
        }
        return next()
    }

    customerRole(req: Request, res: Response, next: NextFunction){
        const user = req.user as UserEntity
        if (user.role !== RoleType.USER){
            return this.status.unauthorized(res, "Your don't customer for this request")
        }
        return next()
    }

}