'use strict';
const crypto = require('crypto');
const uuid1 = require('uuid').v1;

/**
 *
 * @param password
 * @returns {{salt: *, hash: *}}
 */
exports.hashPassword = (password) => {
    // let salt = crypto.randomBytes(16).toString('hex');
    let salt = uuid1();
    let hash = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`);
    // 1000, 64, `sha512`).toString(`hex`);
    return {
        salt,
        hash,
    }
};

/**
 *
 * @param givenPassword
 * @param salt
 * @param password
 * @returns {boolean}
 */
exports.validatePassword = (givenPassword, salt, password) => {
    let expectedHash = crypto.pbkdf2Sync(givenPassword,
        salt, 1000, 64, `sha512`);
    return password.compare(expectedHash) === 0;
};