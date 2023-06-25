import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ResponseCodeStatus } from "../../shared/handle_Errors/http.response";
import { UserEntity } from "../../user/entities/user.entity";

export class AuthController extends AuthService {
    constructor(private readonly status: ResponseCodeStatus = new ResponseCodeStatus() ){
        super()
    }

    async loggin(req: Request, res: Response){
        try {
            const userEncode = req.user as UserEntity

            if (!userEncode) {
                return this.status.badRequest(res, "Invalid credentials");
              }

            const encode = await this.generateToken(userEncode)
            if(!encode){
                return this.status.forbidden(res, "Not permission added")
            }

            res.header("Content-Type", "application/json")
            res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 })
            res.write(JSON.stringify(encode))
            res.end()

        } catch (error) {
            return this.status.serverError(res, error)
        }
    }
}