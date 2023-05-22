import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base_services/base.service";
import { PurchasesProductsDTO } from "../dto/purchase_product.dto";
import { PurchaseProductEntity } from "../entities/purchases_products.entity";
import { ProductService } from "../../product/services/product.service";



export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
    constructor(private readonly productService: ProductService = new ProductService())
    {
        super(PurchaseProductEntity)
    }

    async findPurchaseProducts(): Promise<PurchaseProductEntity[]> {
        return ( await this.execRepository).find()
    }

    async findPurchaseProductById(id: string): Promise<PurchaseProductEntity | null > {
        return (await this.execRepository).findOneBy({id})
    }

    async createPurchaseProduct(purchaseProductBody: PurchasesProductsDTO): Promise<PurchaseProductEntity> 
    {
        const newPurchaseProduct = (await this.execRepository).create(purchaseProductBody)

        const product = (await this.productService.findProductByID(newPurchaseProduct.product.id))

        newPurchaseProduct.totalPrice = product!.price * newPurchaseProduct.quantityProduct

        return (await this.execRepository).save(newPurchaseProduct)
    }

    async updatePurchaseProduct(id: string, infoUpdate: PurchasesProductsDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }

    async deletePurchaseProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({id})
    }
}