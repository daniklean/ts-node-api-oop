import { 
    CreateDateColumn, 
    UpdateDateColumn, 
    PrimaryGeneratedColumn } 
    from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
    })
    updateAt!: Date;
}