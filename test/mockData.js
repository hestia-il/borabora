const passwordUtil = require('../src/utils/password');

let password = "123456";
let {salt, hash} = passwordUtil.hashPassword(password);
exports.userData = {
    "username":"9999999_name",
    "email":"9999999@mail.com",
    "password": password,
    "newPassword": "7777777",
    "id": "9999999",
    "salt": salt,
    "passwordHash": hash
};