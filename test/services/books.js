const chai = require('chai');
const expect = require('chai').expect;
chai.should();
const sinon = require('sinon');

require('dotenv').config();

const booksService = require('../../src/services/books');
const mockData = require('../mockData');
const {axiosStub} = require('../stubs');


describe("services BOOKS service", () => {

    let axiosstub;

    before(() => {
        axiosstub = axiosStub();
    });

    after(() => {
        axiosstub.restore();
    });

    it("getAll success", function (done) {

        axiosstub.get.resolves({
            data: mockData.booksList
        });

        booksService.getAll()
            .then(result => {
                expect(result.response).to.have.property("books");
                done();
            })
    });

    it("getById success", function (done) {

        axiosstub.get.resolves({
            data: mockData.booksList
        });

        booksService.getById('The True Story of Captain Girl #620')
            .then(result => {
                expect(result.response).to.have.property("books");
                done();
            })
    });

});