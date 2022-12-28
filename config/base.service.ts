import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DotenvConfig } from './ConfigEnvs'


export class BaseService<T extends BaseEntity> extends DotenvConfig {
    public execRepository: Promise<Repository<T>>

    constructor(private getEntity: EntityTarget<T>){
        super()
        this.execRepository = this.initRepository(getEntity)
    }
    
    async initRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<Repository<T>> {
        const getConn = await this.dbConnect() 
        return await getConn?.getRepository(entity)!
    }
}