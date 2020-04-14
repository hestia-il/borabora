const chai = require('chai');
const expect = require('chai').expect;
chai.should();
const sinon = require('sinon');

require('dotenv').config();
const mockData = require('../mockData');
const {userModelStub} = require('../stubs');

const userService = require('../../src/services/user');
const errors = require('../../src/errors');

describe("services user service", () => {

    let usermodelstub;
    let refreshToken='';

    before(() => {
        usermodelstub = userModelStub();
    });

    after(() => {
        usermodelstub.restore();
    });

    it("signup success and returns token, user and refresh token in cookie", function (done) {

        usermodelstub.create.resolves({
            id: mockData.userData.id,
            username:  mockData.userData.username,
            email: mockData.userData.email,
            password: mockData.userData.passwordHash,
            salt: mockData.userData.salt
        });

        userService.signup({
            username: mockData.userData.username,
            email: mockData.userData.email,
            password: mockData.userData.password
        })
            .then(result => {

                expect(result.response).to.have.property("token");
                expect(result.response).to.have.property("user");
                expect(result.response.user.uid).to.equal(mockData.userData.id);
                expect(result).to.have.property("cookie");
                expect(result.cookie.name).to.equal("JWT");
                done();
            })
    });

    it("signup failed on duplicate email", function (done) {

        usermodelstub.create.resolves({
            error: new Error("test error")
        });

        userService.signup({
            username: mockData.userData.username,
            email: mockData.userData.email,
            password: mockData.userData.password
        })
            .then(result => {
                expect(result.response).to.have.property("error");
                expect(result.response.error.code).to.equal(errors.SIGNUP.code);
                done();
            })
    });

    it("signin success and returns token, user and refresh token in cookie", function (done) {

        usermodelstub.fetch.resolves({
            id: mockData.userData.id,
            username:  mockData.userData.username,
            email: mockData.userData.email,
            password: mockData.userData.passwordHash,
            salt: mockData.userData.salt
        });

        userService.signin({
            email: mockData.userData.email,
            password: mockData.userData.password
        })
            .then(result => {
                expect(result.response).to.have.property("token");
                expect(result.response).to.have.property("user");
                expect(result.response.user.uid).to.equal(mockData.userData.id);
                expect(result).to.have.property("cookie");
                expect(result.cookie.name).to.equal("JWT");
                refreshToken = result.cookie.val;
                done()
            })
    });

    it("signin failed on wrong password", function (done) {

        usermodelstub.create.resolves({
            error: new Error("test error")
        });

        userService.signin({
            email: mockData.userData.email,
            password: 'wrongpassword'
        })
            .then(result => {
                expect(result.response).to.have.property("error");
                expect(result.response.error.code).to.equal(errors.SIGNIN.code);
                done()
            })
    });

    it("refresh token success and returns token and refresh token in cookie", function () {

        let result = userService.refreshToken({
            "JWT": refreshToken
        });
        expect(result.response).to.have.property("token");
        expect(result).to.have.property("cookie");
        expect(result.cookie.name).to.equal("JWT");
    });

    it("logout and returns response and remove cookie data", function (done) {

        userService.logout({
            JWT: "sometoken"
        })
            .then(result => {
                expect(result.response).to.have.property("success");
                expect(result.response.success).to.equal(true);
                expect(result).to.have.property("cookie");
                expect(result.cookie.name).to.equal("JWT");
                expect(result.cookie.val).to.equal("");
                done()
            })
    });

});