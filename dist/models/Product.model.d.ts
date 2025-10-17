import { Model } from "sequelize-typescript";
declare class Product extends Model {
    name: string;
    price: number;
    available: boolean;
}
export default Product;
