const storectrl = require("../../components/stores/ctrl.store");
const usermodel = require("../../components/auth/model.user");
const faker = require("faker");
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

describe("Create Store", function() {
    test("When user doesn't specify store name. Should return error", async function() {
        const randomuser = await usermodel.findRandomUser({'firstname IS NOT NULL': null});
        const res = mockRes();
        const req =   {
            body: {
                name: faker.company.catchPhrase()
            },
                session: {passport: {user: randomuser._id}}
        };
        const store = await storectrl.create(req, res);
        expect(store)
    });
});