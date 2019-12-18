const request = require('supertest');
let server;// = require("../../bin/www");

describe('Hitting User routes', function() {
    afterEach(()=> {
        server.close();
        jest.clearAllMocks();
    });

    it("Return products user might be interested in based on past usage", async function(){
        jest.mock('../../middlewares/auth', () => ({
            loggedin: jest.fn((req, res, next)=> {
                console.log("**********************\nFake auth\n************************");
                req.session.passport = {user: 6};
                console.log("new req session", req.session.passport);
                return next();
            })
        }));

        server = require("../../bin/www");
        let response = await request(server)
                             .get('/api/v1/user/personalize');

        expect(response.body).toHaveProperty('success');
        expect(response.status).toEqual(200);
        expect(response.body.data).toHaveProperty('best');
    });

    /*it("Logout user. Will delete session cookies and make sure it can't be used to login again.", async function() {
        //server = require("../../bin/www");

        await request(server)
        .get('/api/v1/auth/logout')
        .then(async result => {
            console.log(result.body, "\nresult from logout");

            let testsession =  await request(server)
                .get('/api/v1/user/personalize');

                console.log("test session body", testsession.body);        
        
                expect(testsession).not.toHaveProperty('success');
        
        //        expect(result.body).toHaveProperty('success');
        });
    });*/
});