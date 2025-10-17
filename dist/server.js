import express from "express";
import productRouter from "./router";
import db from "./config/db";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import { swaggerUi, swaggerSpec } from "./config/swagger";
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
        // Permitir el frontend específico y localhost:5173 para desarrollo
        if (origin === process.env.FRONTEND_URL || origin === 'http://localhost:5173') {
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
// Inicializar servidor después de conectar a la DB
async function startServer() {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(colors.bgBlue.white(`Servidor corriendo en puerto ${PORT}`));
            console.log(colors.bgGreen.white("Servidor listo para recibir peticiones"));
        });
    }
    catch (error) {
        console.log(colors.bgRed.white("Error al iniciar servidor"), error);
        process.exit(1);
    }
}
// Solo ejecutar en producción, no en tests
if (process.env.NODE_ENV !== "test") {
    startServer();
}
server.get("/api", (req, res) => {
    res.json({ message: "desde la ruta api" });
});
//swagger
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default server;
//# sourceMappingURL=server.js.map