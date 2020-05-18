const chai = require('chai');
const expect = require('chai').expect;
chai.should();
const sinon = require('sinon');

require('dotenv').config();

const configService = require('../../src/services/config');


describe("services CONFIG service", () => {

    it("getData success", function (done) {

        configService.getData()
            .then(result => {
                expect(result.response).to.have.property("ts");
                expect(result.response).to.have.property("server2clientErrors");
                done();
            })
    });

});