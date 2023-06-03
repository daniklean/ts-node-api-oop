import { Strategy as Jwtstr, StrategyOptions, ExtractJwt } from "passport-jwt";

import { IPayloadToken } from "../interfaces/IPayload";
import { AuthService } from "../services/auth.service";
import { PassportUse } from "../utils/passportuse";

export class JwtStrategy extends AuthService {
    constructor(){
        super()
    }

    async validate(payload: IPayloadToken, done: any){
        return done(null, payload)
    }

    get use(){
        return PassportUse<
        Jwtstr, 
        StrategyOptions, 
        (payload: IPayloadToken, done: any) => Promise<IPayloadToken>>(
            "jwt",
            Jwtstr,
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: this.getEnvironment("JWT_TOKEN"),
            }, 
            this.validate
        )
    }
}
