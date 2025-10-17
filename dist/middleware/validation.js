import { validationResult } from "express-validator";
// 🛡️ MIDDLEWARE PARA MANEJAR ERRORES DE VALIDACIÓN
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    next(); // Si no hay errores, continúa
};
//# sourceMappingURL=validation.js.map