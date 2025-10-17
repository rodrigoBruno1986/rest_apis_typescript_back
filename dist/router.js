import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct, updateAvailable, deleteProduct, } from "./handlers/Product";
import { body, param } from "express-validator";
import { handleValidationErrors } from "./middleware/validation";
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del producto
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre del producto
 *           example: "Cámara Digital"
 *         price:
 *           type: number
 *           description: Precio del producto
 *           example: 299.99
 *         available:
 *           type: boolean
 *           description: Disponibilidad del producto
 *           example: true
 *       required:
 *         - name
 *         - price
 */
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API para gestionar productos
 */
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get("/", [getProducts]);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: ID inválido
 */
router.get("/:id", [
    param("id").isInt().withMessage("El id no es valido"),
    handleValidationErrors,
    getProductById,
]);
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: "Mouse Gamer"
 *               price:
 *                 type: number
 *                 description: Precio del producto (debe ser mayor a 0)
 *                 example: 49.99
 *               available:
 *                 type: boolean
 *                 description: Disponibilidad (opcional, por defecto true)
 *                 example: true
 *             required:
 *               - name
 *               - price
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos inválidos
 */
router.post("/", [
    // 1️⃣ VALIDACIONES (middleware array)
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("price")
        .isNumeric()
        .withMessage("Valor no válido")
        .notEmpty()
        .withMessage("El precio no puede ser vacío")
        .custom((value) => value > 0)
        .withMessage("Precio no válido"),
    // available tiene @Default(true) en el modelo, no es obligatorio
    // 2️⃣ MIDDLEWARE PARA MANEJAR ERRORES
    handleValidationErrors,
    // 3️⃣ HANDLER PRINCIPAL
    createProduct,
]);
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto completamente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Teclado Mecánico"
 *               price:
 *                 type: number
 *                 example: 89.99
 *               available:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - name
 *               - price
 *               - available
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put("/:id", [
    // 1️⃣ VALIDACIONES (middleware array)
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("price")
        .isNumeric()
        .withMessage("Valor no válido")
        .notEmpty()
        .withMessage("El precio no puede ser vacío")
        .custom((value) => value > 0)
        .withMessage("Precio no válido"),
    body("available")
        .isBoolean()
        .withMessage("El estado no es valido")
        .notEmpty()
        .withMessage("El estado no puede ser vacío"),
    param("id").isInt().withMessage("El id no es valido"),
    handleValidationErrors,
    updateProduct,
]);
/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Cambiar disponibilidad del producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               available:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Disponibilidad actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 *                   example: "Estado cambiado a disponible"
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: ID inválido
 */
router.patch("/:id", [
    param("id").isInt().withMessage("El id no es valido"),
    handleValidationErrors,
    updateAvailable,
]);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto eliminado correctamente"
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: ID inválido
 */
router.delete("/:id", [
    param("id").isInt().withMessage("El id no es valido"),
    handleValidationErrors,
    deleteProduct,
]);
export default router;
//# sourceMappingURL=router.js.map