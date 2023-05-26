import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base_dto/base.dto";

export class UserDTO extends BaseDTO {
    
    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    lastname!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    city!: string;

    @IsNotEmpty()
    province!: string;

    @IsNotEmpty()
    role!: RoleType
}

export enum RoleType {
    USER = "USER",
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN"
}