const request = require('supertest');
const auth = require("../middlewares/auth");
let server;// = require("../bin/www");
const sinon = require('sinon');

describe('Hitting User routes', function() {

    beforeAll(() => {
        const loggedinStub = sinon.stub(auth, 'loggedin');
        loggedinStub.callsFake((req, res, next) => {
            console.log("***************\nFake auth\n************************\nREQSESSION===>", req.session);
            req.session.passport = {user: 6};
            console.log("new req session", req.session);
            return next();
        });
        console.log("Mocking");
    });

    it("Return products user might be interested in based on past usage", async function(){
        server = require("../bin/www");
        let response = await request(server)
                             .get('/api/v1/user/personalize')

        console.log("wtf");
        expect(response.body).toHaveProperty('success');
        expect(response.status).toEqual(200);
        expect(response.body.data).toHaveProperty('best');
        console.log(response.status, "\n***************************\nRES\n***************************\n", response.body);
    });


    afterAll(() => {
        sinon.restore();
    });
});

afterAll(()=> {
    server.close();
});