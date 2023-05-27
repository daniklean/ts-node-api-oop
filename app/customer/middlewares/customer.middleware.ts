import { Request, Response, NextFunction } from "express"
import { validate } from "class-validator"
import { ResponseCodeStatus } from "../../shared/handle_Errors/http.response"
import { CustomerDTO } from "../dto/customer.dto"



export class CustomerMiddleware {
   constructor( private readonly status: ResponseCodeStatus = new ResponseCodeStatus){   
   }

  async customerValidate(req: Request, res: Response, next: NextFunction) {
      const {
        address,
        dni
      } = req.body

      const validated = new CustomerDTO()

      validated.address = address
      validated.dni = dni

      const validationProcess = await validate(validated)

      if(validationProcess.length > 0) {
         return this.status.BadRequest(res,validationProcess)
      }
      else {
         next()
      }
   }
   
}