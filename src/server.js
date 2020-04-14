'use strict';
require('dotenv').config();
const config = require('./config');
const http = require('http');
const api = require('./api');
require('./db/eventlog');

process.on('uncaughtException', (err) => {
    console.error('an uncaught exception detected', err);
    process.exit(-1);
});

process.on('unhandledRejection', (err) => {
    console.error('an unhandled rejection detected', err);
    process.exit(-1);
});

const server = http.createServer(api).listen(config.PORT, () => {
    console.log('server is up on port ', config.PORT);
});

module.exports = server;    // for testing