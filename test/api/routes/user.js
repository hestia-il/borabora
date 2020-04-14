const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
chai.use(chaiHttp);
chai.should();

require('dotenv').config();
const mockData = require('../../mockData');
const {userModelStub} = require('../../stubs');

const server = require('../../../src/server');
let testServer;

describe("api-routes-user", () => {

    let usermodelstub;

    before(() => {
        testServer = chai.request(server).keepOpen();
        usermodelstub = userModelStub();
    });

    after(() => {
        testServer.close();
        usermodelstub.restore();
    });

    it("/api/user/signup route is available", function (done) {
        usermodelstub.create.resolves({
            id: mockData.userData.id,
            username:  mockData.userData.username,
            email: mockData.userData.email,
            password: mockData.userData.passwordHash,
            salt: mockData.userData.salt
        });
        testServer
            .post('/api/user/signup')
            .send({
                username: mockData.userData.username,
                email: mockData.userData.email,
                password: mockData.userData.password
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it("/api/user/signin route is available", function (done) {
        usermodelstub.fetch.resolves({
            id: mockData.userData.id,
            username:  mockData.userData.username,
            email: mockData.userData.email,
            password: mockData.userData.passwordHash,
            salt: mockData.userData.salt
        });
        testServer
            .post('/api/user/signin')
            .send({
                email: mockData.userData.email,
                password: mockData.userData.password
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

});