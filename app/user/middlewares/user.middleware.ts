import { Request, Response, NextFunction } from "express"
import { Validate } from "class-validator"
import { UserDTO } from "../dto/user.dto"



export class UserMiddleware {
   userValidate(req: Request, res: Response, next: NextFunction) {
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
   }
}