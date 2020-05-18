const sinon = require('sinon');
const {userModel} = require('../src/db/factory');
const config = require('../src/config');
const booksService = require('../src/services/books');
const axios = require("axios");

exports.userModelStub = () => {
    let sandbox = sinon.createSandbox();

    return {
        create: sandbox.stub(userModel, "create"),
        fetch: sandbox.stub(userModel, "fetch"),
        restore: () => sandbox.restore(),
    }
};

exports.configStub = () => {
    let sandbox = sinon.createSandbox();

    return {
        JWT_EXP: sandbox.stub(config, "JWT_EXP"),
        restore: () => sandbox.restore(),
    }
};

exports.booksStub = () => {
    let sandbox = sinon.createSandbox();

    return {
        getAll: sandbox.stub(booksService, "getAll"),
        restore: () => sandbox.restore(),
    }
};

exports.axiosStub = () => {
    let sandbox = sinon.createSandbox();

    return {
        get: sandbox.stub(axios, "get"),
        restore: () => sandbox.restore(),
    }
};