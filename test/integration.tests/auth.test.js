const passport =require('passport');

let server = require('../../bin/www');
const request = require('supertest');
const faker = require('faker');


afterAll(()=>{
    server.close();
});

describe("Authentication Service", function() {
    describe("Create local account with email and password", function(){
        test("When valid email and password is sent, a 200 response is sent", async function() {
			let email = faker.internet.email();
			let password = faker.internet.password();
			const response = await request(server)
				.post('/api/v1/auth/signup')
                .send({email, password});
            expect(response.statusCode).toEqual(200);
		});
    });

    describe('Login with valid email and password', function() {
        test("Returns cookie with session id and 200 response", async function() {
            const res = await request(server)
                .post('/api/v1/auth/login')
                .send({email: 'shrekogre@swamp.com', password: 'shrek'});

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
            .send({email: "shrekogre@swamp.com", password: "Not shrek"});

            expect(res.status).toEqual(401);
        });
    });
});