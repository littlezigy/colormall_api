const productctrl = require("../../components/products/ctrl.product");
const faker = require('faker');
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
            const res = mockRes();

            let req = {
                body: {
                    name: faker.commerce.productName(), 
                    price: faker.commerce.price(),
                    instock: Math.floor(Math.random() * 201),
                    brand: faker.company.companyName(),
                    shortdesc_: faker.lorem.words(7)
                }, session: {passport: {user: 6}}
            };

            await productctrl.create(req, res);

            expect(res.success).toHaveBeenCalledTimes(1);
        });
    });
    describe('Retrieving personalized view of products for user that exists in system', function() {
        afterEach((done)=> {
            jest.clearAllMocks();
            jest.resetModules();
            done()
        });
    });
});