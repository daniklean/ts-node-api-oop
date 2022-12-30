import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base_services/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity> {
    constructor(){
        super(UserEntity)
    }

    async findAllUser(): Promise<UserEntity[]>{
        return (await this.execRepository).find()
    }
    async findUserByID(id: string): Promise<UserEntity | null>{
        return (await this.execRepository).findOneBy({id})
    }
    async createUser(body: UserDTO): Promise<UserEntity>{
        return (await this.execRepository).save(body)
    }
    async updateUser(id: string, dataUpdate: UserDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, dataUpdate)
    }
    async deleteUser(id: string){
        return (await this.execRepository).delete({id})
    }
    
}