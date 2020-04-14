'use strict';
const tableName = 'users';
const base = require('./base')(tableName);

async function create (id, username, email, password, salt) {
    try {
        // {
        //     "fieldCount": 0,
        //     "affectedRows": 1,
        //     "insertId": 0,
        //     "serverStatus": 2,
        //     "warningCount": 0,
        //     "message": "",
        //     "protocol41": true,
        //     "changedRows": 0
        // }
        await base.query(`insert into ${tableName} (id, username, email, password, salt) values (?,?,?,?,?)`,
            [id, username, email, password, salt]);
        return {
            id,
            username,
            email,
            password,
            salt
        }
    } catch (e) {
        // {
        //     "code": "ER_DUP_ENTRY",
        //     "errno": 1062,
        //     "sqlMessage": "Duplicate entry 'cocacola@mail.com' for key 'email_UNIQUE'",
        //     "sqlState": "23000",
        //     "index": 0,
        //     "sql": "insert into users (id, username, email, password, salt) values ('fb76f916-2102-4bb9-a587-b181e95c6040','cocacola','cocacola@mail.com',X'032f9df388ba6ee53f90b7ff51c85c6cc82eacbb5b93a85582807b9320791f8009c712484d6caf80f9cfd54c55e5ddd09d8abdad509f272934c3201f6b5991ad','8132f2c0-7dd4-11ea-b344-47e5fe210f61')"
        // }
        return {
            error: e
        }
    }
}

module.exports = {
    create,
    fetch: base.fetch,
};