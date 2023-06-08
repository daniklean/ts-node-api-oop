import { Column, Entity, OneToOne, Unique } from "typeorm"
import { BaseEntity } from "../../../config/base_entities/base.entity"
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { RoleType } from "../dto/user.dto";

@Entity({name:"user"})
@Unique(['email'])
export class UserEntity extends BaseEntity {
    @Column()
    username!: string;

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    email!: string;

    @Column({ select: false })
    password!: string;

    @Column()
    city!: string;

    @Column()
    province!: string;

    @Column( {type: 'enum', enum: RoleType, nullable: false} )
    role!: RoleType;

    @OneToOne(() => CustomerEntity, (customer) => customer.user, { cascade: true })
    customer!: CustomerEntity
}