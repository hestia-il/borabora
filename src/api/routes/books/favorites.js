'use strict';
const router = require('express').Router();
// const userService = require('../../services/user');
const auth = require('../../../middleware/auth');

router.post('/', auth, (req, res) => {
    if (req.user) {
        // auth passed with success
        console.log(req.user);
    }
    res.send("OK")
});

router.get('/', auth, (req, res) => {
    if (req.user) {
        // auth passed with success
        // req.user
        // {
        //     uid: '9999999',
        //         username: '9999999_name',
        //     email: '9999999@mail.com',
        //     iat: 1588154759,
        //     exp: 1588158359
        // }
    }
    res.send("OK")
});

router.delete('/', auth, (req, res) => {

});

module.exports = router;