import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { UserEntity } from "../../user/entities/user.entity";
import { AuthService } from "../services/auth.service";
import { PassportUse } from "../utils/passportuse";

const authServices: AuthService = new AuthService()

export class LoginStrategy {
    async validate(
        username: string,
        password: string,
        done: any
    ): Promise<UserEntity>{
        const user = await authServices.validateUser(username,password)

        if(!user){
            return done(null, false, { error: "Invalid username or passsword" })
        }

        return done(null, user)
    }

    get use() {
        return PassportUse<LocalStrategy, Object, VerifyFunction>(
            "login", 
            LocalStrategy, 
            {
                usernameField: "username",
                passwordField: "password"
            }, 
            this.validate
        )
    }
}