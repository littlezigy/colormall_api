const request = require('supertest');
const auth = require("../../middlewares/auth");
let server;
let passport;
jest.isolateModules(()=> {
    server = require('../../bin/www');
    passport = require('passport');
})

describe('Hitting User routes', function() {
    afterEach((done)=> {
        jest.clearAllMocks();
        jest.resetModules();
        done()
    });

    it("Return products user might be interested in based on past usage", async function(){
        await jest.spyOn(auth, 'loggedin').mockImplementationOnce((req, res, next)=> {
                console.log("**********************\nFake auth\n************************");
                req.session.passport = {user: 6};
                return next();
            });
        server1 = require("../../bin/www");
        
        let response = await request(server1).get('/api/v1/user/personalize');


        server1.close();
        expect(response.body).toHaveProperty('success');
        expect(response.status).toEqual(200);
        expect(response.body.data).toHaveProperty('best');
    });

    test.skip("Logout user. Will delete session cookies and make sure it can't be used to login again.", async function() {
        console.log("\n====================\nLogout\n====================");
        passport.authenticate = jest.fn((authType, options, callback) => () => {callback(null, {id: 6})});
        const server2 = require("../../bin/www");

        let result = await request(server2)
        .get('/api/v1/auth/logout');
        console.log(result.body, "\nresult from logout");

        let testsession =  await request(server)
            .get('/api/v1/user/personalize');

        console.log("test session body", testsession.body);        

        expect(passport.authenticate).toHaveBeenCalledTimes(1);
        expect(testsession).not.toHaveProperty('success');
        expect(testsession.statusCode).toEqual(401);
        expect(result.body).toHaveProperty('success');
        server2.close();
    });
});