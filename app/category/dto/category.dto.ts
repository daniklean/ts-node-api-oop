import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base_dto/base.dto";


export class CategoryDTO extends BaseDTO {

    @IsNotEmpty()
    categoryName!: string;
        
}