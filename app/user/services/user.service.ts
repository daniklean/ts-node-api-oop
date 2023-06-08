import { DeleteResult, UpdateResult } from "typeorm";
import * as bcrypt from "bcrypt"
import { BaseService } from "../../../config/base_services/base.service";
import { RoleType, UserDTO } from "../dto/user.dto";
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
        const newUser = (await this.execRepository).create(body)
        const hashing = await bcrypt.hash(newUser.password, 10)
        newUser.password = hashing
        return (await this.execRepository).save(newUser)
    }

    async updateUser(id: string, dataUpdate: UserDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, dataUpdate)
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({id})
    }

    async findUserWithRelation(id: string): Promise<UserEntity | null> {
        return (await this.execRepository)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.customer", "customer")
        .where({ id })
        .getOne();
    }
    
    async findUserByWithRole(id: string, role: RoleType): Promise<UserEntity | null> {
        const user = (await this.execRepository)
        .createQueryBuilder('user')
        .where({ id })
        .andWhere({ role })
        .getOne()

        return user
    }

    async findAndValidateUser(username: string): Promise<UserEntity | null> {
        return (await this.execRepository)
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where((qb) => {
            qb.where('user.email = :username', { username })
            .orWhere('user.username = :username', { username })
        })
        .getOne()
    }

    async findUserExisting(username: string, email: string): Promise<UserEntity | null>{
        return (await this.execRepository)
        .findOne({ where: [{ username }, { email }] })
    }
}