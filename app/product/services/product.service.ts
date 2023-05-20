import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base_services/base.service";
import { ProductEntity } from "../entities/product.entity";
import { ProductDTO } from "../dto/product.dto";

export class ProductService extends BaseService<ProductEntity> {
    constructor(){
        super(ProductEntity)
    }

    async findAllProducts(): Promise<ProductEntity[]>{
        return (await this.execRepository).find()
    }
    async findProductByID(id: string): Promise<ProductEntity | null>{
        return (await this.execRepository).findOneBy({id})
    }
    async createProduct(body: ProductDTO): Promise<ProductEntity>{
        return (await this.execRepository).save(body)
    }
    async updateProduct(id: string, dataUpdate: ProductDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, dataUpdate)
    }
    async deleteProduct(id: string){
        return (await this.execRepository).delete({id})
    }
    
}