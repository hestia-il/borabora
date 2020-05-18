'use strict';
const server2clientErrors = require('../errors/server2client');

const getData = () => {

    return new Promise(resolve => {
        resolve({
            response: {
                ts: new Date().getTime(),
                server2clientErrors
            }
        })
    })

};

module.exports = {
    getData,
};