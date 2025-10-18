import express from "express";
import productRouter from "./router.js";
import db from "./config/db.js";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
// Conectar a la base de datos
async function connectDB() {
    try {
        await db.authenticate();
        await db.sync();
    }
    catch (error) {
        console.log(colors.bgRed.white("Error de conexión a la base de datos"), error);
    }
}
//cors
const corsOptions = {
    origin: (origin, callback) => {
        console.log('origin: ', origin);
        // Permitir el frontend específico, localhost:5173 para desarrollo y Vercel
        if (origin === process.env.FRONTEND_URL ||
            origin === 'http://localhost:5173' ||
            origin === 'https://rest-apis-typescript-front-end.vercel.app') {
            console.log('✅ Origen permitido:', origin);
            callback(null, true);
        }
        else {
            console.log('❌ Origen denegado:', origin);
            callback(new Error('No permitido por CORS'));
        }
    }
};
//inicializar express
const server = express();
//leer el body
server.use(express.json());
// Morgan para logging de peticiones HTTP
server.use(morgan('dev'));
server.use(cors(corsOptions));
server.use("/api/products", productRouter);
// Solo ejecutar en producción, no en tests
if (process.env.NODE_ENV !== "test") {
    connectDB();
}
server.get("/api", (req, res) => {
    res.json({ message: "desde la ruta api" });
});
//swagger
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default server;
//# sourceMappingURL=server.js.map