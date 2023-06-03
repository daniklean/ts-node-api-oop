import { Request, Response, NextFunction } from "express"
import { validate } from "class-validator"
import { ResponseCodeStatus } from "../../shared/handle_Errors/http.response"
import {PurchasesProductsDTO} from "../dto/purchase_product.dto"

export class PurchaseProductMiddleware {
   constructor( private readonly status: ResponseCodeStatus = new ResponseCodeStatus){   
   }

  async purchaseProductValidate(req: Request, res: Response, next: NextFunction) {
      const {
        quantityProduct,
        totalPrice,
        purchase,
        product
      } = req.body

      const validated = new PurchasesProductsDTO()

      validated.quantityProduct = quantityProduct
      validated.totalPrice = totalPrice
      validated.purchase = purchase
      validated.product = product
      
      const validationProcess = await validate(validated)

      if(validationProcess.length > 0) {
         return this.status.BadRequest(res,validationProcess)
      }
      else {
         next()
      }
   }
   
}
