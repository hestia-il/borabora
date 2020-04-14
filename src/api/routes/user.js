'use strict';
const router = require('express').Router();
const userService = require('../../services/user');
const auth = require('../../middleware/auth');

router.post('/signup', (req, res) => {
    userService.signup(req.body)
        .then(result => {

                if (result.cookie) {
                    let {name, val, opts} = result.cookie;
                    res.cookie(name, val, opts);
                }
                res.json(formatResponse(result.response));
            }
        );
});

router.post('/signin', (req, res) => {
    userService.signin(req.body)
        .then(result => {

            if (result.cookie) {
                let {name, val, opts} = result.cookie;
                res.cookie(name, val, opts);
            }
            res.json(formatResponse(result.response));
        })
});

router.get('/token', (req, res) => {
    userService.refreshToken(req.cookies)
        .then(result => {
            if (result.cookie) {
                let {name, val, opts} = result.cookie;
                res.cookie(name, val, opts);
            }
            res.json(formatResponse(result.response));
        })
});

router.post('/logout', (req, res) => {
    userService.logout(req.cookies)
        .then(result => {

            if (result.cookie) {
                let {name, val, opts} = result.cookie;
                res.cookie(name, val, opts);
            }
            res.json(result.response);
        })
});

router.get('/profile', auth, (req, res) => {
    res.send({
        profile: req.user
    })
});

module.exports = router;

function formatResponse(r) {
    if (r.error) {
        let {message, code} = r.error;
        return {
            error: {
                message,
                code
            }
        }
    }
    return r
}