'use strict';
const {v4: uuid4} = require('uuid');

const passwordUtil = require('../utils/password');
const {userModel} = require('../db/factory');
const redisStore = require('../db/redis');
const jwtUtil = require('../utils/jwt');
const errors = require('../errors');
const config = require('../config');

/**
 *
 * @param data
 * @returns {Promise<{response: {error: *}}|{cookie: {val: *, opts: {expires: *, httpOnly: boolean}, name: string}, response: {user: *, token: *}}>}
 */
const signup = async (data) => {
    let {username, email, password} = data;
    let {hash, salt} = passwordUtil.hashPassword(password);
    let uid = uuid4();
    let user = await userModel.create(uid, username, email, hash, salt);

    if (user.error) {
        let {code, sqlMessage} = user.error;
        console.error(sqlMessage);
        return {
            response: {
                error: (code === 'ER_DUP_ENTRY') ? errors.SIGNUP_EXISTS : errors.SIGNUP
            }
        }
    }

    return theHappyEnd({uid: user.id, username, email});
};

/**
 *
 * @param data
 * @returns {Promise<{response: {error: *}}|{cookie: {val: *, opts: {expires: *, httpOnly: boolean}, name: string}, response: {user: *, token: *}}>}
 */
const signin = async (data) => {
    let {email, password} = data;
    let user = await userModel.fetch({
        email
    });

    if (user.error) {
        let {code, sqlMessage} = user.error;
        console.error(sqlMessage);
        return {
            response: {error: errors.SIGNIN}
        }
    }

    if (!user.id) {
        return {
            response: {error: errors.SIGNIN_NOT_EXISTS}
        }
    }

    if (passwordUtil.validatePassword(password, user.salt, user.password)) {
        return theHappyEnd({uid: user.id, username: user.username, email});
    }
    return {
        response: {error: errors.SIGNIN}
    }
};

/**
 *
 * @param cookies
 * @returns {Promise<{cookie: {val: string, opts: {expires: *, httpOnly: boolean}, name: string}, response: {success: boolean}}>}
 */
const logout = async (cookies) => {
    const refreshToken = cookies.JWT;
    redisStore.del(refreshToken);
    return {
        response: {success: true},
        // remove cookie data
        cookie: {
            name: 'JWT',
            val: '',
            opts: {
                httpOnly: true,
                expires: new Date(Date.now() - Number(config.JWT_REFRESH_EXP) * 1000)
            }
        }
    }
};

const refreshToken = (cookies) => {
    const refreshToken = cookies.JWT;
    const payload = redisStore.get(refreshToken);

    if (!payload) {
        //The server looks for this refresh token in the DB,
        // and in case there is no such token, we send a 403 HTTP error
        return {
            response: {
                error: errors.REFRESH_TOKEN_FAILED
            }
        }
    }

    const payloadFromRefreshToken = jwtUtil.verifyRefreshToken(refreshToken);

    if (!payloadFromRefreshToken) {
        //  If the token is invalid, we send a 403 HTTP error.
        return {
            response: {
                error: errors.REFRESH_TOKEN_FAILED
            }
        }
    }

    return theHappyEnd({
        uid: payloadFromRefreshToken.uid,
        username: payloadFromRefreshToken.username,
        email: payloadFromRefreshToken.email
    })
};

module.exports = {
    signup,
    signin,
    logout,
    refreshToken
};


function theHappyEnd(payload) {
    let token = jwtUtil.createAccessToken(payload);
    let refreshToken = jwtUtil.createRefreshToken(payload);
    redisStore.set(refreshToken, JSON.stringify(payload));
    return {
        response: {
            token,
            user: payload,
        },
        cookie: {
            name: 'JWT',
            val: refreshToken,
            opts: {
                httpOnly: true,
                expires: new Date(Date.now() + Number(config.JWT_REFRESH_EXP) * 1000)
            }
        }
    }
}