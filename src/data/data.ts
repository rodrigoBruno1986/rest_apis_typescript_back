// borramos la base de datos (SOLO en desarrollo)

import process from "process";
import db from "../config/db";

const clearDb = async () => {
    // ⚠️ PROTECCIÓN: NO permitir en producción
    if (process.env.NODE_ENV === "production") {
        console.error("❌ ERROR: No se puede borrar la base de datos en producción!");
        return;
    }

    try {
        await db.sync({ force: true });
        console.log("✅ Base de datos limpiada (solo desarrollo)");
    } catch (error) {
        console.error("❌ Error al limpiar la base de datos:", error);
        process.exit(1);
    }
};

export default clearDb;
