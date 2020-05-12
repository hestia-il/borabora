'use strict';
const router = require('express').Router();
const configService = require('../../services/config');

router.get('/', (req, res) => {
    configService.getData()
        .then(result => {
                res.json(result.response);
            }
        );
});

module.exports = router;