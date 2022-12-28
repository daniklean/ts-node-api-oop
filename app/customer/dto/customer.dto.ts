import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base_dto/base.dto";


export class CustomerDTO extends BaseDTO {

    @IsNotEmpty()
    address!: string;

    @IsNotEmpty()
    dni!: number;
    
}