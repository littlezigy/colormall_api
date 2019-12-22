jest.mock("pg");
let { Pool } = require("pg");
let spyOn = jest.spyOn(Pool.prototype, 'query');
const db = require("../../bin/database");
const faker = require("faker");

describe("Testing the database", function() {
    beforeAll(()=> {
        db.initializeDatabase();
    });
    afterEach(()=> {
        jest.clearAllMocks();
    });

    describe("list()", function(){
        test("When no conditions are specified, query() should not have second argument", async function() {
            await db.list("users");
            expect(spyOn).toHaveBeenCalledTimes(1);
            expect(spyOn).toHaveBeenCalledWith(expect.any(String));
        });
        test("When condition is a string like `name IS NOT NULL", async function() {
            await db.list('users', {'firstname IS NOT NULL': null});
            expect(spyOn).toHaveBeenCalledWith(expect.any(String));
        });
    });
    describe("paginate function", function() {
    });
    describe("Testing findone()", function() {
        test("When condition with a string is specified", async function() {
            await db.findone('users', {'firstname IS NOT NULL': null});
            expect(spyOn).toHaveBeenCalledWith(expect.any(String));
        });
    });
    describe("Testing findone_random()", function() {
        Pool = jest.requireActual("pg");
        beforeAll(()=> {
            jest.unmock("pg");
            //Pool = jest.require.requireActual("pg");
        })
        test.skip("When condition with a string is specified", async function() {
            console.log("FIND ONE RANDOM\n--------------------");
            let test1 = await db.findonerandom('users', {'firstname IS NOT NULL': null});
            let test2 = await db.findonerandom('users', {'firstname IS NOT NULL': null});
            let test3 = await db.findonerandom('users', {'firstname IS NOT NULL': null});
            console.log("TRIPLETS\n-----------------\n", test1, test2, test3);
            expect(test1).not.toEqual(test2);
            expect(test2).not.toEqual(test3);
            expect(spyOn).toHaveBeenCalledWith(expect.any(String));
        });
    })
    describe("Testing create()", function() {
        describe("Tests are correct here", async function() {
            test("Create product with required fields", async function() {
                await db.create('products', ['name_', 'store_id'], ["Cold stores", 1]);
            });
        });
    });
});