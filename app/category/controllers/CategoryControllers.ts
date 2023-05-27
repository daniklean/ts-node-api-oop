import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from 'typeorm'
import { ResponseCodeStatus } from "../../shared/handle_Errors/http.response";
import { CategoryService } from "../services/category.service";

export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService = new CategoryService,
        private readonly status: ResponseCodeStatus = new ResponseCodeStatus 
    ){}

    async getCategories(req: Request, res:Response) {
        try {
           const data = await this.categoryService.findAllCategory()
           if(data.length === 0){
              return this.status.NotFound(res,"Not data found")
           }
           return this.status.Success(res,data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
  
     async getCategoryByID(req: Request, res:Response) {
        try {
           const { id } = req.params
           const data = await this.categoryService.findCategoryByID(id)
           if(!data){
              return this.status.NotFound(res,"Not exist Category")
           }
           return this.status.Success(res,data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
  
     async createCategory(req: Request, res:Response) {
        try {
           const data = await this.categoryService.createCategory(req.body)
           res.status(200).json(data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
  
     async updateCategory(req: Request, res:Response) {
        try {
           const { id } = req.params
           const data: UpdateResult = await this.categoryService.updateCategory(id, req.body)
           if(!data.affected){
              return this.status.NotFound(res,"Not updated data category")
           }
           res.status(200).json(data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
  
     async deleteCategory(req: Request, res:Response) {
        try {
           const { id } = req.params
           const data: DeleteResult = await this.categoryService.deleteCategory(id)
           if(!data.affected){
              return this.status.NotFound(res,"Not delete data Category")
           }
           res.status(200).json(data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
}