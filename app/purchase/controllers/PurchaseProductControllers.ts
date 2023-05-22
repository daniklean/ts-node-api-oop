import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ResponseCodeStatus } from '../../shared/handle_Errors/http.response'
import { PurchaseProductService } from '../services/purchase_product.service'

export class PurchaseProductControllers {
   constructor(
      private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService,
      private readonly status: ResponseCodeStatus = new ResponseCodeStatus 
      ){}

   async getPurchasesProducts(req: Request, res:Response) {
      try {
         const data = await this.purchaseProductService.findPurchaseProducts()
         if(data.length === 0){
            return this.status.NotFound(res,"Not data")
         }
         return this.status.Success(res,data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async getPurchaseProductByID(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data = await this.purchaseProductService.findPurchaseProductById(id)
         if(!data){
            return this.status.NotFound(res,"Not exist Purchase Product")
         }
         return this.status.Success(res,data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async postCreatePurchaseProduct(req: Request, res:Response) {
      try {
         const data = await this.purchaseProductService.createPurchaseProduct(req.body)
         res.status(200).json(data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async updatePurchaseProduct(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data: UpdateResult = await this.purchaseProductService.updatePurchaseProduct(id, req.body)
         if(!data.affected){
            return this.status.NotFound(res,"Not updated data purchase product")
         }
         res.status(200).json(data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async deletePurchaseProduct(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data: DeleteResult = await this.purchaseProductService.deletePurchaseProduct(id)
         if(!data.affected){
            return this.status.NotFound(res,"Not delete data purchase purchase")
         }
         res.status(200).json(data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }
}