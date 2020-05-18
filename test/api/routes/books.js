const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
chai.use(chaiHttp);
chai.should();

require('dotenv').config();
const mockData = require('../../mockData');
const {axiosStub} = require('../../stubs');

const server = require('../../../src/server');
let testServer;

describe("api-routes-books", () => {

    // let booksstub;
    let axiosstub;

    before(() => {
        testServer = chai.request(server).keepOpen();
        // booksstub = booksStub();
        axiosstub = axiosStub();
    });

    after(() => {
        testServer.close();
        // booksstub.restore();
        axiosstub.restore();
    });

    it("/api/books GET route is available", function (done) {

        // booksstub.getAll.resolves({
        //     books: []
        // });

        axiosstub.get.resolves({
            data: mockData.booksList
        });

        testServer
            .get('/api/books')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it("/api/books/:id GET route is available", function (done) {

        axiosstub.get.resolves({
            data: [mockData.booksList[0]]
        });

        testServer
            .get('/api/books/The True Story of Captain Girl #620')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });


});