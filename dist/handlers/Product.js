import Product from "../models/Product.model";
export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.json({ data: products });
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
};
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        // Verificar si el producto existe ANTES de responder
        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado",
                message: `No existe un producto con el ID ${id}`,
            });
        }
        res.json({ data: product });
    }
    catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).json({ error: "Error al obtener producto" });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado",
                message: `No existe un producto con el ID ${id}`,
            });
        }
        // actualizar el producto con los datos del body
        await product.update(req.body);
        res.json({ data: product });
    }
    catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar producto" });
    }
};
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ data: product });
    }
    catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear producto" });
    }
};
export const updateAvailable = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado",
                message: `No existe un producto con el ID ${id}`,
            });
        }
        // Cambiar automáticamente el estado: true → false, false → true
        const newAvailability = !product.available;
        await product.update({ available: newAvailability });
        res.json({
            data: product,
            message: `Estado cambiado a ${newAvailability ? "disponible" : "no disponible"}`,
        });
    }
    catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar producto" });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado",
                message: `No existe un producto con el ID ${id}`,
            });
        }
        await product.destroy();
        res.json({ message: "Producto eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
};
//# sourceMappingURL=Product.js.map