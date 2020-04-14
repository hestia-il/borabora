'use strict';

function error(message, code, statusCode=200) {
    return {
        message,
        code,
        statusCode
    }
}
module.exports = {
    SIGNUP: error('Signup failed', 90001),
    SIGNUP_EXISTS: error('Signup failed: user exists', 90002),
    SIGNIN: error('Signin failed', 90003),
    SIGNIN_NOT_EXISTS: error('Signin failed: user not found', 90004),

    // AUTH: error('Authentication failed', 90003),

    SIGNIN_REQUIRED: error('Signin required', 40001, 403),
    REFRESH_TOKEN_REQUIRED: error('Refresh token required', 40002, 401),
    REFRESH_TOKEN_FAILED: error('Refresh token failed', 40003, 403),
};