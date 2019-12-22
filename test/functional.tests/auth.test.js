const passport =require('passport');
const uuid = require("uuid/v1");

let server = require('../../bin/www');
const request = require('supertest');
const faker = require('faker');

afterAll(()=>{
    console.log("ENDING TEST SUITE");
    server.close();
});

describe("Authentication Service", function() {
    const email_ = `${parseInt(Math.random()*13000)}${faker.internet.email()}`;
    const password_ = faker.internet.password();
    describe("Local Signup", function(){
        test("With email and password only", async function() {

			const response = await request(server)
				.post('/api/v1/auth/signup')
                .send({email: email_, password: password_});
            
                expect(response.statusCode).toEqual(200); 
        });
        test("With firstname and lastname", async function() {
            const randomemail = `${parseInt(Math.random()*13000)}${faker.internet.email()}`;
            const randompassword = faker.internet.password();
			const response = await request(server)
				.post('/api/v1/auth/signup')
                .send({firstname: faker.name.firstName(), lastname: faker.name.lastName(), email: randomemail, password: randompassword});
            
                expect(response.statusCode).toEqual(200); 
        });
        test("Complete with display name as well", async function() {
            const randomemail = `${parseInt(Math.random()*13000)}${faker.internet.email()}`;
			const response = await request(server)
				.post('/api/v1/auth/signup')
                .send({firstname: faker.name.firstName(), lastname: faker.name.lastName(), displayname: faker.internet.userName(), email: randomemail, password: faker.internet.password()});
            
                expect(response.statusCode).toEqual(200); 
		});
    });


    describe('Login with valid email and password', function() {
        test("Returns cookie with session id and 200 response", async function() {
            const res = await request(server)
                .post('/api/v1/auth/login')
                .send({email: email_, password: password_});

            expect(res.statusCode).toEqual(200);
            expect(res.headers).toHaveProperty('set-cookie');
            cookies = res.headers['set-cookie'][0];
        });
    });
    
    describe("Hit a guarded user route with no session id cookie set", function() {
        test("Hits route user/personalize and data is not returned plus error status is sent", async function() {
            let res = await request(server)
                    .get('/api/v1/user/personalize');

            expect(res.body).not.toHaveProperty('success');
            expect(res.body).not.toHaveProperty('data.best');
        });
    });

    describe("Login with the wrong credentials", function() {
        test("Login with invalid username", async function() {
            let res = await request(server)
            .post('/api/v1/auth/login')
            .send({email: "notshrekogre@swamp.com", password: "shrek"});

            expect(res.status).toEqual(401);
        });

        test("Login with bad password", async function() {
            let res = await request(server)
            .post('/api/v1/auth/login')
            .send({email: email_, password: "Not shrek"});

            expect(res.status).toEqual(401);
        });
    });
    describe("Account issh", function() {
        test.todo("Account Confirmation");
        test.todo("Change email");
        test.todo("Change password");
    });
});