'use strict';
const serverErrors = require('./index');

const errors = Object.create(null);

for(let err in serverErrors) {
    let edata = serverErrors[err];
    errors[edata.code] = serverErrors[err].message
}

module.exports = errors;