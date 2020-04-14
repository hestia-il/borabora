const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 *
 * @param payload
 * @returns {payload}
 */
exports.createAccessToken = (payload) => {
    return create(payload, config.JWT_SECRET, Number(config.JWT_EXP));
};

/**
 *
 * @param payload
 * @returns {payload}
 */
exports.createRefreshToken = (payload) => {
    return create(payload, config.JWT_REFRESH_SECRET, Number(config.JWT_REFRESH_EXP));
};

/**
 *
 * @param token
 * @returns {{}|null}
 */
exports.verifyAccessToken = token => {
    if (!token.startsWith('Bearer')) {
        // Reject if there is no Bearer in the token
        return null
    }
    // Remove Bearer from string
    token = token.slice(7, token.length);
    return verify(token, config.JWT_SECRET)
};

/**
 *
 * @param token
 * @returns {{}}
 */
exports.verifyRefreshToken = (token) => {
    return verify(token, config.JWT_REFRESH_SECRET)
};

/**
 *
 * @param token
 * @param jwtSecret
 * @returns {{}|null}
 */
function verify (token, jwtSecret) {

    try {
        let payload = jwt.verify(token, jwtSecret);
        if(!payload || !payload.uid){
            return null
        }
        return {
            ...payload
        }
    } catch (e) {
        console.error(e.message);
        return null
    }
}

/**
 *
 * @param payload
 * @param jwtSecret
 * @param expiredIn
 * @returns {undefined|*}
 */
function create(payload, jwtSecret, expiredIn){
    return jwt.sign(payload, jwtSecret, {expiresIn: expiredIn});
}