import { BaseService } from "../../../config/base_services/base.service";
import { CategoryDTO } from "../dto/category.dto";
import { CategoryEntity } from "../entities/category.entity";
import { DeleteResult, UpdateResult } from "typeorm";


export class CategoryService extends BaseService<CategoryEntity> {
    constructor(){
        super(CategoryEntity)
    }
}