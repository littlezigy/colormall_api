const request = require("supertest");
const server = require("../../bin/www");
const faker = require('faker');

afterAll(()=> {
    server.close();
})
describe('Products service', function() {
    test('Create Product', async function() {
        let newproduct = await request(server)
            .post("/api/v1/products/create")
            .send({name: faker.commerce.productName(), name: faker.commerce.price})

        expect(newproduct.statusCode).toEqual(200);
    });
});