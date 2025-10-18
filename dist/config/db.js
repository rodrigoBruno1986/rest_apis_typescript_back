import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Product from "../models/Product.model.js";
// Cargar variables de entorno
dotenv.config();
const db = new Sequelize(process.env.DATABASE_URL, {
    models: [Product], // Importar el modelo directamente
    logging: false,
});
export default db;
//# sourceMappingURL=db.js.map