const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
chai.use(chaiHttp);
chai.should();

require('dotenv').config();
const jwtUtil = require('../../../../src/utils/jwt');

const mockData = require('../../../mockData');
const {userModelStub} = require('../../../stubs');

const server = require('../../../../src/server');
let testServer;

describe("api-routes-books-favorites", () => {

    before(() => {
        testServer = chai.request(server).keepOpen();
        // usermodelstub = userModelStub();
    });

    after(() => {
        testServer.close();
        // usermodelstub.restore();
    });

    it("/api/books/favorites (get) route is available", function (done) {
        // usermodelstub.create.resolves({
        //     id: mockData.userData.id,
        //     username:  mockData.userData.username,
        //     email: mockData.userData.email,
        //     password: mockData.userData.passwordHash,
        //     salt: mockData.userData.salt
        // });

        let token = jwtUtil.createAccessToken({
            uid: mockData.userData.id,
            username: mockData.userData.username,
            email: mockData.userData.email
        });
        let refresh_token = jwtUtil.createRefreshToken({
            uid: mockData.userData.id,
            username: mockData.userData.username,
            email: mockData.userData.email
        });

        testServer
            .get('/api/books/favorites')
            .set('Cookie', 'JWT=' + refresh_token)
            .auth(token, {type: 'bearer'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

});