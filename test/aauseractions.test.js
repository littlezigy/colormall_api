const { describe } = require('mocha');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sinon = require('sinon');

const auth = require("../middlewares/auth");
let sandbox = sinon.createSandbox();
//const loggedinStub = sandbox.stub(auth, 'loggedin');


describe('Hitting User routes', function() {
    console.log("First");
    before(function(done) {
        console.log("before each");
        sandbox.stub(auth, 'loggedin').callsFake((req, res, next) => {
            console.log("***************\nFake auth\n************************\nREQSESSION===>", req.session);
            req.session.passport = {user: 6};
            console.log("new req session", req.session);
            return next();
        });
        done();
    });

    /*afterEach(function(done) {
        sandbox.restore();
        done();
    });*/
    after(function(done) {
        sandbox.restore();
        done();
    });

    //describe("Returns specially picked products to user", function() {
        it("Return products user might be interested in based on past usage", function(done) {
            console.log("frack");
            let server2 = require('../bin/www');
            chai.request(server2)
            .get('/api/v1/user/personalize')
            .end(function(err, res) {
                console.log("wtf");
                expect(res.body).to.have.property('success');
                expect(res.status).to.be.equal(200);

                if(err) return done(err);
                console.log(res.status, "\n***************************\nRES\n***************************\n", res.body);
                done();
            });
        });
    //})
});