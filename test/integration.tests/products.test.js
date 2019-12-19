const request = require("supertest");
let auth = require("../../middlewares/auth");

const loggedinguard = jest.spyOn(auth, 'loggedin'); //spying on login guard

let server = require('../../bin/www');
/*
jest.isolateModules(()=> {
    server = require('../../bin/www');
    auth = require("../../middlewares/auth");
});*/

const faker = require('faker');

afterAll(async()=> {
    await server.close();
});

describe('Products service', function() {
    describe("Create a product", function() {
        test('when not logged in', async function() {

            let newproduct = await request(server)
                .post("/api/v1/products")
                .send({name: faker.commerce.productName(), 
                        price: faker.commerce.price(),
                        instock: Math.floor(Math.random() * 201),
                        brand: faker.company.companyName(),
                        isactive: true,
                        shortdesc_: faker.lorem.words(7)
                    });

            console.log(newproduct.body);
            expect(loggedinguard).toHaveBeenCalledTimes(1);
            expect(newproduct.statusCode).toEqual(401);
            server.close();
        });
    });
});