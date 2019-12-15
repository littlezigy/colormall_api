const passport =require('passport');
//const passportstub = sinon.stub(passport);

let server = require('../bin/www');
const request = require('supertest');

describe("Basic Auth", function() {
    describe("Create account", function(){
        test.todo("Local auth");
    });

    describe('Login user with valid email and password', function() {
        test("should return cookies and successful response", async function() {
            const res = await request(server)
                .post('/api/v1/auth/login')
                .send({email: 'shrekogre@swamp.com', password: 'shrek'});

            expect(res.statusCode).toEqual(200);
            expect(res.headers).toHaveProperty('set-cookie');
            cookies = res.headers['set-cookie'][0];
        });
    });
    
    describe("Illegal user operations", function() {
        test("When session id from logged out session is used to access user/personalize, error message is sent", async function() {
            console.log("Illegal user operation");
            let res = await request(server)
                    .get('/api/v1/user/personalize');

            expect(res.body).not.toHaveProperty('success');
            expect(res.body).not.toHaveProperty('data.best');
        });
    });

    describe("Wrong credentials auth", function() {
        test("Username does not exist", async function() {
            let res = await request(server)
            .post('/api/v1/auth/login')
            .send({email: "notshrekogre@swamp.com", password: "shrek"});

            expect(res.status).toEqual(401);
        });

        test("Bad password", async function() {
            let res = await request(server)
            .post('/api/v1/auth/login')
            .send({email: "shrekogre@swamp.com", password: "Not shrek"});

            expect(res.status).toEqual(401);
        });
    });
});



afterAll(()=>{
    server.close();
});
