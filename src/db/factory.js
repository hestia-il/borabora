'use strict';
const config = require('../config');

const models = Object.create(null);

if (config.DB_TYPE === 'mongo') {
    //
} else {
    models.userModel = require('./mysql/models/user');
}

module.exports = models;