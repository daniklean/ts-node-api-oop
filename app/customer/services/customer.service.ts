import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base_services/base.service";
import { CustomerEntity } from "../entities/customer.entity";
import { CustomerDTO } from "../dto/customer.dto";


export class CustomerService extends BaseService<CustomerEntity> {
    constructor(){
        super(CustomerEntity)
    }

    async findAllCustomer(): Promise<CustomerEntity[]>{
        return (await this.execRepository).find()
    }
    async findCustomerByID(id: string): Promise<CustomerEntity | null>{
        return (await this.execRepository).findOneBy({id})
    }
    async createCustomer(body: CustomerDTO): Promise<CustomerEntity>{
        return (await this.execRepository).save(body)
    }
    async updateCustomer(id: string, dataUpdate: CustomerDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, dataUpdate)
    }
    async deleteCustomer(id: string){
        return (await this.execRepository).delete({id})
    }
}