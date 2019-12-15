const { describe } = require('mocha');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sinon = require('sinon');
const should = chai.should();
const passport =require('passport');

const server = require('../bin/www');

describe("Basic Auth", function() {
    let cookies = '';

    describe('Login user with valid email and password', function() {
        it("should return cookies and successful response", function(done) {
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
    
    describe("Logout user", function() {
        it("Delete cookies and return success response", function(done) {
            chai.request(server)
            .get('/api/v1/auth/logout')
            .set('Cookie', cookies)
            .end(function(err, res) {
                if(err) return done(err);
                console.log("Logout cookies", cookies);
                console.log(res.body);
                //expect(res.statusCode).to.be.equal(200)
                res.body.should.have.property('success');
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
                res.body.should.have.property('fail');
                expect(res.body.fail).to.be.equal('Not logged in');
                done();
            });
        });
    });
});


describe("User login Operations", function() {
    describe("Wrong credentials auth", function() {

        it("Username does not exist", function(done) {
            chai.request(server)
            .post('/api/v1/auth/login')
            .send({email: "notshrekogre@swamp.com", password: "shrek"})
            .end(function(err, res) {
                try {
                    console.log("res obj", res);
                    expect(res.status).to.be.equal(401);
                    done();
                } catch(err) {
                    console.log('errorrr');
                    return done(err);
                }
            });
        });

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
    })
})