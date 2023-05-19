import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base_dto/base.dto";
import { Exclude } from "class-transformer";

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
}

export enum RoleType {
    USER = "USER",
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN"
}