const productctrl = require("../../components/products/ctrl.product");
//const uuid = require("uuid/v1");
const faker = require('faker');
const usermodel = require("../../components/auth/model.user");
jest.isolateModules(()=> {
    server = require('../../bin/www');
    passport = require('passport');
});

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.gerror = jest.fn().mockReturnValue(res);
    res.success = jest.fn().mockReturnValue(res);
    return res;
}

describe("Products Service", function() {
    describe("Creates products", function() {

        it("With valid fields and adds to user's store", async function(){
            const randomuser = await usermodel.findRandomUser({'firstname IS NOT NULL': null});
            console.log("RANDOM USER", randomuser._id);
            console.log("*********************\nfound random user\n*****************", randomuser);
            const res = mockRes();
            let req =   {
                body: {
                    name: faker.commerce.productName(), 
                    price: faker.commerce.price(),
                    instock: Math.floor(Math.random() * 201),
                    brand: faker.company.companyName(),
                    shortdesc_: faker.lorem.words(7)
                },
                    session: {passport: {user: randomuser._id}}
            };

            await productctrl.create(req, res);

            expect(res.success).toHaveBeenCalledTimes(1);
        });
    });
    describe("Update product", function() {
        let productmodel = require("../../components/products/model.product");
        let someproducts = productmodel.list();
        test.skip("When user owns the product", async function() {
            
        });
    });
});