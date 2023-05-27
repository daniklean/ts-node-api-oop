import { Request, Response, NextFunction } from "express"
import { validate } from "class-validator"
import { ResponseCodeStatus } from "../../shared/handle_Errors/http.response"
import { CategoryDTO } from "../dto/category.dto"



export class CategoryMiddleware {
   constructor( private readonly status: ResponseCodeStatus = new ResponseCodeStatus){   
   }

  async categoryValidate(req: Request, res: Response, next: NextFunction) {
      const {
        categoryName,
      } = req.body

      const validated = new CategoryDTO()

      validated.categoryName = categoryName

      const validationProcess = await validate(validated)

      if(validationProcess.length > 0) {
         return this.status.BadRequest(res,validationProcess)
      }
      else {
         next()
      }
   }
   
}