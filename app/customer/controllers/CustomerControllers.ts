import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from 'typeorm'
import { ResponseCodeStatus } from "../../shared/handle_Errors/http.response";
import { CustomerService } from "../services/customer.service";

export class CustomerController {
    constructor(
        private readonly customerService: CustomerService = new CustomerService,
        private readonly status: ResponseCodeStatus = new ResponseCodeStatus 
    ){}

    async getCustomers(req: Request, res:Response) {
        try {
           const data = await this.customerService.findAllCustomer()
           if(data.length === 0){
              return this.status.NotFound(res,"Not data found")
           }
           return this.status.Success(res,data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
  
     async getCustomerByID(req: Request, res:Response) {
        try {
           const { id } = req.params
           const data = await this.customerService.findCustomerByID(id)
           if(!data){
              return this.status.NotFound(res,"Not exist Customer")
           }
           return this.status.Success(res,data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }

     async getUserWithRelationById(req: Request, res: Response) {
      try {
         const { id } = req.params;
         const data = await this.customerService.findCustomerWithRelation(id);
         if (!data) {
            return this.status.NotFound(res, "Not match data relation");
        }
         return this.status.Success(res, data);
      } catch (error:any) {
         return this.status.ServerError(res, error);
      }
    }
  
     async createCustomer(req: Request, res:Response) {
        try {
           const data = await this.customerService.createCustomer(req.body)
           res.status(200).json(data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
  
     async updateCustomer(req: Request, res:Response) {
        try {
           const { id } = req.params
           const data: UpdateResult = await this.customerService.updateCustomer(id, req.body)
           if(!data.affected){
              return this.status.NotFound(res,"Not updated data customer")
           }
           res.status(200).json(data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
  
     async deleteCustomer(req: Request, res:Response) {
        try {
           const { id } = req.params
           const data: DeleteResult = await this.customerService.deleteCustomer(id)
           if(!data.affected){
              return this.status.NotFound(res,"Not delete data Category")
           }
           res.status(200).json(data)
        } catch (error:any) {
           return this.status.ServerError(res,error)
        }
     }
}