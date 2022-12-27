import { Column, Entity } from "typeorm"

import { BaseEntity } from "../config/base.entity"

@Entity({name:"user"})

export class UserEntity extends BaseEntity {
    @Column()
    username!: string;

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    jobPosition!: string;

    @Column()
    numberPhone!: number;
}