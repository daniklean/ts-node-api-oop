import { RoleType } from "../../user/dto/user.dto";

export interface IPayloadToken {
    role: RoleType,
    sub: string
}