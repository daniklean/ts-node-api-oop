import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ResponseCodeStatus } from '../../shared/handle_Errors/http.response'
import { UserService } from '../services/user.service'

export class UserController {
   constructor(
      private readonly userService: UserService = new UserService,
      private readonly status: ResponseCodeStatus = new ResponseCodeStatus 
      ){}

   async getUsers(req: Request, res:Response) {
      try {
         const data = await this.userService.findAllUser()
         if(data.length === 0){
            return this.status.NotFound(res,data)
         }
         return this.status.Success(res,data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async getUserByID(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data = await this.userService.findUserByID(id)
         if(!data){
            return this.status.NotFound(res,"Not exist User")
         }
         return this.status.Success(res,data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async getUserWithRelationById(req: Request, res: Response) {
      try {
         const { id } = req.params;
         const data = await this.userService.findUserWithRelation(id);
         if (!data) {
            return this.status.NotFound(res, "Not match data relation");
        }
         return this.status.Success(res, data);
      } catch (error:any) {
         return this.status.ServerError(res, error);
      }
    }

   async createUser(req: Request, res:Response) {
      try {
         const data = await this.userService.createUser(req.body)
         res.status(200).json(data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async updateUser(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data: UpdateResult = await this.userService.updateUser(id, req.body)
         if(!data.affected){
            return this.status.NotFound(res,"Not updated data user")
         }
         res.status(200).json(data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }

   async deleteUser(req: Request, res:Response) {
      try {
         const { id } = req.params
         const data: DeleteResult = await this.userService.deleteUser(id)
         if(!data.affected){
            return this.status.NotFound(res,"Not deleted data user")
         }
         res.status(200).json(data)
      } catch (error:any) {
         return this.status.ServerError(res,error)
      }
   }
}