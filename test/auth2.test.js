const sinon = require('sinon');
const server = require("../bin/www");


describe("These tests require a valid user session created with passport object.", function() {
    test.skip("Logout user. Will delete session cookies and make sure it can't be used to login again.", async function() {
        let response =  await request(server)
        .get('/api/v1/auth/logout')
        .set('Cookie', cookies)
        console.log("Logout cookies", cookies);
        console.log(res.body);
        res.body.should.have.property('success');
    });
});

describe("Account issh", function() {
    test.todo("Account Confirmation");
    test.todo("Change email");
    test.todo("Change password");
})