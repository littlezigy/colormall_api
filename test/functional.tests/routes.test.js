//Some routes have guards on them. This checks to make sure 
const request = require("supertest");
const server = require("../../bin/www");

afterAll(()=>{ 
    server.close();
});

describe("All routes that have to do with products", function () {
    describe("Hitting the /products routes", function() {
        test("GET /products. Has no guard. should be successful", async function() {
            console.log("Don't be printing on me!");
            const response = await request(server)
                .get('/api/v1/products');
            expect(response.statusCode).toEqual(200);
            expect(response.body).toHaveProperty('success');
        });
        test("POST /products. Should hit a 401", async function() {
            console.log("wtf???");
            const response = await request(server)
                .post('/api/v1/products');

            expect(response.statusCode).toEqual(401);
        });
    });
});