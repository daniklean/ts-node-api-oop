import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ResponseCodeStatus } from '../../shared/handle_Errors/http.response'
import { PurchaseService } from '../services/purchase.service'

export class PurchaseControllers {
   constructor(
      private readonly purchaseService: PurchaseService = new PurchaseService,
      private readonly status: ResponseCodeStatus = new ResponseCodeStatus 
      ){}

   async getPurchases(req: Request, res:Response) {
      try {
         const data = await this.purchaseService.findAllPurchases
         if(data.length === 0){
            return this.status.NotFound(res,data)
         }
         return this.status.Success(res,data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async getPurchaseByID(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data = await this.purchaseService.findPurchaseByID(id)
         if(!data){
            return this.status.NotFound(res,"Not exist Purchase")
         }
         return this.status.Success(res,data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async createPurchase(req: Request, res:Response) {
      try {
         const data = await this.purchaseService.createPurchase(req.body)
         res.status(200).json(data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async updatePurchase(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data: UpdateResult = await this.purchaseService.updatePurchase(id, req.body)
         if(!data.affected){
            return this.status.NotFound(res,"Not updated data purchase")
         }
         res.status(200).json(data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async deletePurchase(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data: DeleteResult = await this.purchaseService.deletePurchase(id)
         if(!data.affected){
            return this.status.NotFound(res,"Not delete data purchase")
         }
         res.status(200).json(data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }
}