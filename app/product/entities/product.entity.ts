import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { BaseEntity } from "../../../config/base_entities/base.entity"
import { CategoryEntity } from "../../category/entities/category.entity";
import { PurchaseProductEntity } from "../../review/entities/purchases_products.entity";

@Entity({name:"product"})

export class ProductEntity extends BaseEntity {
    @Column()
    productName!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

   @ManyToOne(() => CategoryEntity, (category) => category.products)
   @JoinColumn({name:'category_id'})
   category!: CategoryEntity

   @OneToMany(() => PurchaseProductEntity, (purchaseProduct) => purchaseProduct.product)
   purchaseProduct!: PurchaseProductEntity[]
}