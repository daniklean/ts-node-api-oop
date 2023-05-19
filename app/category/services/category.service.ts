import { BaseService } from "../../../config/base_services/base.service";
import { CategoryDTO } from "../dto/category.dto";
import { CategoryEntity } from "../entities/category.entity";
import { DeleteResult, UpdateResult } from "typeorm";


export class CategoryService extends BaseService<CategoryEntity> {
    constructor(){
        super(CategoryEntity)
    }

    async findAllCategory(): Promise<CategoryEntity[]>{
        return (await this.execRepository).find()
    }
    async findCategoryByID(id: string): Promise<CategoryEntity | null>{
        return (await this.execRepository).findOneBy({id})
    }
    async createCategory(body: CategoryDTO): Promise<CategoryEntity>{
        return (await this.execRepository).save(body)
    }
    async updateCategory(id: string, dataUpdate: CategoryDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, dataUpdate)
   }
    async deleteCategory(id: string): Promise<DeleteResult>{
        return (await this.execRepository).delete({id})
    }
}