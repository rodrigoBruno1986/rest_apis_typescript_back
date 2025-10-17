import request from "supertest";
import server from "../server";

describe("Get api", () => {
    it("debe devolver un mensaje desde la ruta api", async () => {
        const response = await request(server).get("/api");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"].match("/json/"));
        expect(response.body.message).toBe("desde la ruta api");
    });
});
