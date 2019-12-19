const usermodel = require("../../components/auth/model.user");
const bcrypt = require('bcrypt-node');
const faker = require("faker");
const db = require("../../bin/database");

jest.mock('../../bin/database', ()=> ({
    create:  jest.fn(()=> {return {data: true, rows: true}})
}));

describe("Makes sure that model.user is working properly", function() {
    it("Tests create() function", async function() {
        const hashpwd = jest.spyOn(bcrypt, 'hashSync');

        const createfn = await usermodel.create({email: faker.internet.email(), password: faker.internet.password()});
        console.log("\n**********************\nCREATE FN\n**************\n", createfn);
        expect(hashpwd).toHaveBeenCalledTimes(1);
        expect(db.create).toHaveBeenCalledTimes(1);
    });
});