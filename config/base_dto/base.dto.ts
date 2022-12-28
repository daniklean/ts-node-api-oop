import { IsDate, IsOptional, IsUUID } from "class-validator"


export abstract class BaseDTO  { 

    @IsUUID()
    @IsOptional()
    id!: string

    @IsDate()
    @IsOptional()
    createAt!: Date

    @IsDate()
    @IsOptional()
    updateAt!: Date

}