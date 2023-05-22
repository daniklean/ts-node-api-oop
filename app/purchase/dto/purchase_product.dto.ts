import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../../config/base_dto/base.dto";
import { PurchaseEntity } from "../entities/purchase.entity";
import { ProductEntity } from "../../product/entities/product.entity";

export class PurchasesProductsDTO extends BaseDTO {

    @IsNotEmpty()
    quantityProduct!: number;

    @IsOptional()
    totalPrice?: number;

    @IsOptional()
    purchase?: PurchaseEntity;

    @IsOptional()
    product?: ProductEntity;
}