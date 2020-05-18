const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
chai.use(chaiHttp);
chai.should();

require('dotenv').config();
// const mockData = require('../../mockData');
// const {userModelStub} = require('../../stubs');

const server = require('../../../src/server');
let testServer;

describe("api-routes-config", () => {

    before(() => {
        testServer = chai.request(server).keepOpen();
    });

    after(() => {
        testServer.close();
    });

    it("/api/config GET route is available", function (done) {

        testServer
            .get('/api/config')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

});