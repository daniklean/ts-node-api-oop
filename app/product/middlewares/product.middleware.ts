import { Request, Response, NextFunction } from "express"
import { validate } from "class-validator"
import { ResponseCodeStatus } from "../../shared/handle_Errors/http.response"
import { ProductDTO } from "../dto/product.dto"



export class ProductMiddleware {
   constructor( private readonly status: ResponseCodeStatus = new ResponseCodeStatus){   
   }

  async productValidate(req: Request, res: Response, next: NextFunction) {
      const {
        productName,
        description,
        price
      } = req.body

      const validated = new ProductDTO()

      validated.productName = productName
      validated.description = description
      validated.price = price

      const validationProcess = await validate(validated)

      if(validationProcess.length > 0) {
         return this.status.badRequest(res,validationProcess)
      }
      else {
         next()
      }
   }
   
}