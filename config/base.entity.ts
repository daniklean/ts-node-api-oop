import { 
    CreateDateColumn, 
    UpdateDateColumn, 
    PrimaryGeneratedColumn } 
    from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn({
        name: "created_Ad",
        type: "timestamp",
    })
    createdAd!: Date;

    @UpdateDateColumn({
        name: "update_Ad",
        type: "timestamp",
    })
    updateAt!: Date;
}