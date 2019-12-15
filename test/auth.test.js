process.env.NODE_ENV = 'test';

const { describe } = require('mocha');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const should = chai.should();

chai.use(chaiHttp);

describe("Sessions and Auth", function() {
    let cookies = '';

    describe('Login user shrek', function() {
        it("Login user and get cookies", function(done) {
        chai.request(server)
            .post('/api/v1/auth/login')
            .send({email: 'shrekogre@swamp.com', password: 'shrek'})
            .end(function(err, res) {
                res.should.have.property('statusCode', 200);
                res.headers.should.have.property('set-cookie');
                cookies = res.headers['set-cookie'][0];
                done();
            });
        });
    });
    
    describe('Getting personalized ads', function() {
        it("Return products user might be interested in based on past usage", function(done) {
            chai.request(server)
            .get('/api/v1/user/personalize')
            .set('Cookie', cookies)
            .end(function(err, res) {
                expect(cookies).to.be.a('string').that.is.not.empty;
                res.body.should.have.property('success');
                expect(res.body.data.best).to.be.an('array').that.is.not.empty;
                done();
            });
        });
    });
    describe("Logout user", function() {
        it("Delete cookies", function(done) {
            chai.request(server)
            .get('/api/v1/auth/logout')
            .set('Cookie', cookies)
            .end(function(err, res) {
                    console.log("Logout cookies", cookies);
                    console.log(res.headers);
                    console.log(res.body);
                
                done();
            });
        });
    });
    describe("Illegal login", function() {
        it("When session id from logged out session is used to access user/personalize, error message is sent", function(done) {
            chai.request(server)
            .get('/api/v1/user/personalize')
            .set('Cookie', cookies)
            .end(function(err, res) {
                console.log("res status", res.status);
                res.body.should.have.property('fail');
                expect(res.body.fail).to.be.equal('Not logged in');
                done();
            });
        });
    });
});

describe("User login Operations", function() {
    describe("Wrong credentials auth", function() {
        it("Bad password", function(done) {
            chai.request(server)
            .post('/api/v1/auth/login')
            .send({email: "shrekogre@swamp.com", password: "Not shrek"})
            .end(function(err, res) {
                try {
                    console.log("res.headers", res.headers);
                    console.log("res status", res.status);
                    expect(res.status).to.be.equal(401);
                    done();
                }catch(err) {
                    console.log("error");
                    done(err);
                }
            });
        });
        it("Username does not exist auth", function(done) {
            chai.request(server)
            .post('/api/v1/auth/login')
            .send({email: "notshrekogre@swamp.com", password: "shrek"})
            .end(function(err, res) {
                expect(res.status).to.be.equal(401);
                done();
            })
        })
    })
})