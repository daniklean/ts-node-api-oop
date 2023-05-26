import { Request, Response, NextFunction } from "express"
import { validate } from "class-validator"
import { UserDTO } from "../dto/user.dto"
import { ResponseCodeStatus } from "../../shared/handle_Errors/http.response"



export class UserMiddleware {
   constructor( private readonly status: ResponseCodeStatus = new ResponseCodeStatus){   
   }

  async userValidate(req: Request, res: Response, next: NextFunction) {
      const {
         username,
         name,
         lastname,
         email,
         password,
         city,
         province,
         role,
      } = req.body

      const validated = new UserDTO()

      validated.username = username
      validated.name = name
      validated.lastname = lastname
      validated.email = email
      validated.password = password
      validated.city = city
      validated.province = province
      validated.role = role

      const validationProcess = await validate(validated)

      if(validationProcess.length > 0) {
         return this.status.ServerError(res,validationProcess)
      }
      else {
         next()
      }
   }
   
}