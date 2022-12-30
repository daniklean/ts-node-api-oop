import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
   constructor(private readonly userService: UserService = new UserService){}

   async getUser(req: Request, res:Response) {
      try {
         const data = await this.userService.findAllUser()
         res.status(200).json(data)
      } catch (error:any) {
         console.log(`Muchacho ocurrio un error: ${error}`)
      }
   }

   async getUserByID(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data = await this.userService.findUserByID(id)
         res.status(200).json(data)
      } catch (error:any) {
         console.log(`Muchacho ocurrio un error: ${error}`)
      }
   }

   async postCreateUser(req: Request, res:Response) {
      try {
         const data = await this.userService.createUser(req.body)
         res.status(200).json(data)
      } catch (error:any) {
         console.log(`Muchacho ocurrio un error: ${error}`)
      }
   }

   async updateUser(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data = await this.userService.updateUser(id, req.body)
         res.status(200).json(data)
      } catch (error:any) {
         console.log(`Muchacho ocurrio un error: ${error}`)
      }
   }

   async deleteUser(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data = await this.userService.deleteUser(id)
         res.status(200).json(data)
      } catch (error:any) {
         console.log(`Muchacho ocurrio un error: ${error}`)
      }
   }
}