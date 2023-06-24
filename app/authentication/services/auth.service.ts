import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';
import { DotenvConfig } from "../../../config/ConfigEnvs";
import { UserService } from "../../user/services/user.service";
import { UserEntity } from '../../user/entities/user.entity';
import { IPayloadToken } from '../interfaces/IPayload';

export class AuthService extends DotenvConfig {
    constructor(
        private readonly userServices: UserService = new UserService(),
        private readonly JWTInstance = jwt
    ) {
        super()
    }

    public async validateUser(username: string, password: string): Promise<UserEntity | null> {
        const userByUsernameOrEmail = await this.userServices.findAndValidateUser(username)

        if (userByUsernameOrEmail) {
            const isMatch = await bcrypt.compare(password, userByUsernameOrEmail.password)
            if(isMatch){
                return userByUsernameOrEmail
            }
        }

        return null
    }

    sing(paylod: jwt.JwtPayload, secret: any) {
        return this.JWTInstance.sign(paylod, secret, { expiresIn: "1h"})
    }

    public async generateToken(user: UserEntity):
        Promise<{ accessToken: string; user: UserEntity }> {
        const consult = await this.userServices.findUserByWithRole(
            user.id,
            user.role
        )

        const payload: IPayloadToken = {
            role: consult!.role,
            sub: consult!.id,
        }

        if(consult){
            user.password = "Not Permission"
        }

        return {
            accessToken: this.sing(payload, this.getEnvironment("JWT_TOKEN")),
            user,
        }
    }
}

