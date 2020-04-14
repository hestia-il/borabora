const sinon = require('sinon');
const {userModel} = require('../src/db/factory');
const config = require('../src/config');

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