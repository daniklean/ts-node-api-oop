import { Request, Response, NextFunction } from "express"
import { validate } from "class-validator"
import { ResponseCodeStatus } from "../../shared/handle_Errors/http.response"
import {PurchaseDTO}  from "../dto/purchases.dto"

export class PurchaseMiddleware {
   constructor( private readonly status: ResponseCodeStatus = new ResponseCodeStatus){   
   }

  async purchaseValidate(req: Request, res: Response, next: NextFunction) {
      const {
        status,
        paymentMethod,
        customer
      } = req.body

      const validated = new PurchaseDTO()

      validated.status = status
      validated.paymentMethod = paymentMethod
      validated.customer = customer
      
      const validationProcess = await validate(validated)

      if(validationProcess.length > 0) {
         return this.status.ServerError(res,validationProcess)
      }
      else {
         next()
      }
   }
   
}
