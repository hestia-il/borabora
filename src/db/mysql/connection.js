'use strict';
const mysql = require('mysql');
const config = require('../../config');

const databaseCredentials = {
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DBNAME,
    connectionLimit: 10,
};

const pool = mysql.createPool(databaseCredentials);
pool.on('connection', function (connection) {
    console.log('A new connection %d is made', connection.threadId)
});
pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

exports.pool = pool;