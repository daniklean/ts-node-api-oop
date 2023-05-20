import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from 'typeorm'
import { ResponseCodeStatus } from "../../shared/handle_Errors/http.response";
import { ProductService } from "../services/product.service";

export class ProductControllers {
    constructor(
        private readonly productService: ProductService = new ProductService,
        private readonly status: ResponseCodeStatus = new ResponseCodeStatus 
    ){}

    async getProducts(req: Request, res:Response) {
        try {
           const data = await this.productService.findAllProducts()
           if(data.length === 0){
              return this.status.NotFound(res,"Not data found")
           }
           return this.status.Success(res,data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
  
     async getProductByID(req: Request, res:Response) {
        try {
           const { id } = req.params
           const data = await this.productService.findProductByID(id)
           if(!data){
              return this.status.NotFound(res,"Not exist Product")
           }
           return this.status.Success(res,data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
  
     async postCreateProduct(req: Request, res:Response) {
        try {
           const data = await this.productService.createProduct(req.body)
           res.status(200).json(data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
  
     async updateProduct(req: Request, res:Response) {
        try {
           const { id } = req.params
           const data: UpdateResult = await this.productService.updateProduct(id, req.body)
           if(!data.affected){
              return this.status.NotFound(res,"Not updated data product")
           }
           res.status(200).json(data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
  
     async deleteProduct(req: Request, res:Response) {
        try {
           const { id } = req.params
           const data: DeleteResult = await this.productService.deleteProduct(id)
           if(!data.affected){
              return this.status.NotFound(res,"Not delete data Product")
           }
           res.status(200).json(data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
}