// Script para limpiar la base de datos
import clearDb from "./data";
console.log("🗑️  Limpiando base de datos...");
clearDb()
    .then(() => {
    console.log("✅ Proceso completado");
    process.exit(0);
})
    .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map