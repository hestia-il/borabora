'use strict';
const {pool} = require('../connection');

module.exports = function(tableName) {
    return {
        fetch: async function (by = {}) {
            let q = `select * from ${tableName}`;
            let and = '';
            let values = [];
            let byParams = Object.entries(by);
            if (byParams.length) {
                q += ` where `;
                byParams.forEach(([col, val]) => {
                    q += `${and}${col}=?`;
                    values.push(val);
                    and = ` and `;
                })
            }

            try {
                let result = await query(q, values);

                return {
                    ...result[0]
                }
            } catch (e) {
                return {
                    error: e
                }
            }
        },

        query,
    }
};

async function query (stmt, data = []) {
    return new Promise((resolve, reject) => {
        if (data.length) {
            pool.query(stmt,
                data,
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
        } else {
            pool.query(stmt,
                (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                })
        }
    });
}