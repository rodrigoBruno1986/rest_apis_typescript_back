import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
    it("debe mostrar errores de validación cuando no se envían datos", async () => {
        const response = await request(server).post("/api/products").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(4);
    });

    it("debe crear un producto correctamente", async () => {
        const response = await request(server).post("/api/products").send({
            name: "camara",
            price: 100,
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");
    });

    it("debe validar que el precio sea mayor a 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "camara",
            price: 0,
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
    });
});

describe("GET /api/products", () => {

    it("debe verificar que la URL existe", async () => {
        const response = await request(server).get("/api/products");
        expect(response.status).toBe(200);
    });


    it("debe obtener todos los productos", async () => {
        const response = await request(server).get("/api/products");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveLength(1);
        

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("errors");
    });

    it("debe obtener un producto por ID", async () => {
        const response = await request(server).get("/api/products/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
    });

    it("debe retornar 404 si el producto no existe", async () => {
        const response = await request(server).get("/api/products/9999");
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error");
    });

    it("debe retornar 400 si el ID no es válido", async () => {
        const response = await request(server).get("/api/products/abc");
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
    });
});

describe("PUT /api/products/:id", () => {
    
    it("debe actualizar un producto correctamente", async () => {
        const response = await request(server)
            .put("/api/products/1")
            .send({
                name: "Cámara Actualizada",
                price: 150,
                available: false
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data.name).toBe("Cámara Actualizada");
        expect(response.body.data.price).toBe(150);
    });

    it("debe retornar 404 si el producto no existe", async () => {
        const response = await request(server)
            .put("/api/products/9999")
            .send({
                name: "Producto Inexistente",
                price: 100,
                available: true
            });
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error");
    });

    it("debe validar los datos al actualizar", async () => {
        const response = await request(server)
            .put("/api/products/1")
            .send({
                name: "",
                price: -10,
                available: "no es boolean"
            });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
    });

    it("debe retornar 400 si el ID no es válido", async () => {
        const response = await request(server)
            .put("/api/products/abc")
            .send({
                name: "Producto",
                price: 100,
                available: true
            });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
    });
});

describe("PATCH /api/products/:id", () => {
    
    it("debe cambiar el estado de disponibilidad", async () => {
        const response = await request(server)
            .patch("/api/products/1")
            .send({ available: false });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("message");
    });

    it("debe retornar 404 si el producto no existe", async () => {
        const response = await request(server)
            .patch("/api/products/9999")
            .send({ available: true });
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error");
    });

    it("debe retornar 400 si el ID no es válido", async () => {
        const response = await request(server)
            .patch("/api/products/abc")
            .send({ available: true });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
    });
});

describe("DELETE /api/products/:id", () => {
    
    it("debe eliminar un producto correctamente", async () => {
        const response = await request(server).delete("/api/products/1");
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Producto eliminado correctamente");
    });

    it("debe retornar 404 si el producto no existe", async () => {
        const response = await request(server).delete("/api/products/9999");
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error");
    });

    it("debe retornar 400 si el ID no es válido", async () => {
        const response = await request(server).delete("/api/products/abc");
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
    });
});
