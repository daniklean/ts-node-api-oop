import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base_dto/base.dto";


export class PurchaseDTO extends BaseDTO {

    @IsNotEmpty()
    status!: string;

    @IsNotEmpty()
    paymentMethod!: string;
}

export class PurchasesProductsDTO extends BaseDTO {

    @IsNotEmpty()
    quantityProduct!: number;

    @IsNotEmpty()
    totalPrice!: number;
}