const jwtUtil = require('../utils/jwt');
const errors = require('../errors');

module.exports = (req, res, next) => {
//https://valor-software.com/articles/json-web-token-authorization-with-access-and-refresh-tokens-in-angular-application-with-node-js-server.html
    const refreshToken = req.cookies.JWT;
    const token = req.headers.authorization;

    if (!token || !refreshToken) {
        next({
            error: errors.SIGNIN_REQUIRED
        })
    }

    const payload = jwtUtil.verifyAccessToken(token);
    if(!payload) {
        next({
            error: errors.REFRESH_TOKEN_REQUIRED
        })
    } else {
        req.user = {
            ...payload
        };
        next()
    }
};