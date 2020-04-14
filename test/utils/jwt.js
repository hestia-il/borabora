const chai = require('chai');
const expect = require('chai').expect;
require('dotenv').config();

const jwtUtil = require('../../src/utils/jwt');

const mockData = require('../mockData');
const {configStub} = require('../stubs');

describe("jwtUtil", () => {

    it("createAccessToken and verify success", () => {
        let token = jwtUtil.createAccessToken({
            uid: mockData.userData.id,
            username: mockData.userData.username,
            email: mockData.userData.email
        });
        let payload = jwtUtil.verifyAccessToken('Bearer ' + token);
        expect(payload.uid).to.equal(mockData.userData.id);
        expect(payload.email).to.equal(mockData.userData.email);
    });

    it("createAccessToken and verify failed on expired token", () => {

        let configstub = configStub();
        configstub.JWT_EXP.value(0);

        let token = jwtUtil.createAccessToken({
            uid: mockData.userData.id,
            username: mockData.userData.username,
            email: mockData.userData.email
        });
        let payload = jwtUtil.verifyAccessToken('Bearer ' + token);
        expect(payload).to.equal(null);

        configstub.restore();
    });

    it("createRefreshToken and verify success", () => {
        let token = jwtUtil.createRefreshToken({
            uid: mockData.userData.id,
            username: mockData.userData.username,
            email: mockData.userData.email
        });
        let payload = jwtUtil.verifyRefreshToken(token);
        expect(payload.uid).to.equal(mockData.userData.id);
    });

});