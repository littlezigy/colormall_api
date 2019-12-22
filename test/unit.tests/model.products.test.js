const mock_zipobj = require("@littlezigy/zipobject");
const db = require("../../bin/database");

jest.mock("../../bin/database",  () => ({
    update: jest.fn(function(){
        const data = mock_zipobj(arguments[1], arguments[2])
        return {   
            message: "Product updated!", 
            data
        };
    }),
    create:  jest.fn( function() {
        const rows = mock_zipobj(arguments[1], arguments[2])
        console.log("ARGUMENTS", arguments);
        console.log("\nDATA\n---------------",{ rows });
        return { rows };
    })
}));

const productmodel = require("../../components/products/model.product");
const faker = require("faker");

describe("Create product", function() {
    let productname = faker.commerce.productName();
    let store_id = parseInt(Math.random()*150);
    test("With name and store_id only", async function() {
        let create = await productmodel.create({name_: productname, 'store_id': store_id});
        console.log("Create function ", create, "create.name", create.name_);
        expect(create).toHaveProperty('name_', productname);
        expect(create).toHaveProperty('store_id', store_id);
    });
    test("With product name only. should throw error", async function() {
        const fn = async () => {
            await productmodel.create({name_: productname});
        }
        expect(fn()).rejects.toThrowError();
    });
});

describe("Update Product", function() {
    test("When product.isactive is set to true, returns true", async function() {
        
        let update = await productmodel.update({name: faker.commerce.productName(), isactive: true});
        expect(update.data).toHaveProperty('isactive', true);
    });

    test("When product.isactive is set to false, returns true", async function() {
        let update = await productmodel.update({name: faker.commerce.productName(), isactive: false});
        expect(update.data).toHaveProperty('isactive', false);
    });
});