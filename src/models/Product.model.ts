import { Model, Table, Column, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "products",
})
class Product extends Model {
    @Column({
        type: DataType.STRING(100),
    })
    declare name: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    declare price: number;

    @Default(true) //no es necesario mandarlo al  rerequest
    @Column({
        type: DataType.BOOLEAN,
    })
    declare available: boolean;
}

export default Product;
