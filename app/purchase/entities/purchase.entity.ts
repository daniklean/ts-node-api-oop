import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { BaseEntity } from "../../../config/base_entities/base.entity"
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { PurchaseProductEntity } from "../../review/entities/purchases_products.entity";

@Entity({name:"purchase"})

export class PurchaseEntity extends BaseEntity {
    @Column()
    status!: string;

    @Column()
    paymentMethod!: string;

    @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
    @JoinColumn({name:'customer_id'})
    customer!: CustomerEntity

    @OneToMany(() => PurchaseProductEntity, (purchaseProduct) => purchaseProduct.purchase)
    purchaseProduct!: PurchaseProductEntity[]
}
