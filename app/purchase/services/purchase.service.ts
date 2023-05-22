import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base_services/base.service";
import { PurchaseDTO } from "../dto/purchases.dto";
import { PurchaseEntity } from "../entities/purchase.entity";

export class PurchaseService extends BaseService<PurchaseEntity> {
    constructor(){
        super(PurchaseEntity)
    }

    async findAllPurchases(): Promise<PurchaseEntity[]>{
        return (await this.execRepository).find()
    }
    async findPurchaseByID(id: string): Promise<PurchaseEntity | null>{
        return (await this.execRepository).findOneBy({id})
    }
    async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity>{
        return (await this.execRepository).save(body)
    }
    async updatePurchase(id: string, dataUpdate: PurchaseDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, dataUpdate)
    }
    async deletePurchase(id: string){
        return (await this.execRepository).delete({id})
    }
    
}