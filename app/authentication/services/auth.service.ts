import * as jwt from 'jsonwebtoken'
import { compare } from 'bcrypt';
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
        const userByEmail = await this.userServices.findUserByEmail(username)
        const userByUsername = await this.userServices.findUserByUsername(username)

        if (userByUsername) {
            const isMatch = await compare(password, userByUsername.password)
            isMatch && userByUsername
        }

        if (userByEmail) {
            const isMatch = await compare(password, userByEmail.password)
            isMatch && userByEmail
        }

        return null
    }

    sing(paylod: jwt.JwtPayload, secret: any) {
        return this.JWTInstance.sign(paylod, secret)
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

