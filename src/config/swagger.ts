import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options : swaggerJsdoc.Options = {
    swaggerDefinition: {
    openapi: '3.0.0',
    tags: [
        { 
        name: 'products',
        description: 'API para gestionar productos' 
    },
    ],
    info: { title: 'Rest Api de productos', 
        version: '1.0.0', description: 'API para gestionar productos' },
    },
    apis: ['./src/router.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };