const request = require('supertest');
const auth = require("../../middlewares/auth");
let server;
let passport;

const faker = require('faker');

describe('Hitting User routes', function() {
    test.skip('when logged in and can create products', async function() {
        await jest.spyOn(auth, 'loggedin').mockImplementationOnce((req, res, next)=> {
                console.log("**********************\nFake auth\n************************");
                req.session.passport = { user: 6 };
                console.log("\nsession object \n", req.session);
                return next();
            });

        server1 = require("../../bin/www");

        let newproduct = await request(server1)
            .post("/api/v1/products")
            .send({name: faker.commerce.productName(), 
                    price: faker.commerce.price(),
                    instock: Math.floor(Math.random() * 201),
                    brand: faker.company.companyName(),
                    shortdesc_: faker.lorem.words(7)
                });

        console.log(newproduct.statusCode);
        expect(newproduct.statusCode).toEqual(200);
        expect(productcreate).toHaveBeenCalledTimes(1);
        expect(newproduct.body).toHaveProperty("success");

        expect(newproduct.statusCode).toEqual(200);
        server1.close();
    });
});