'use strict';

const getData = () => {

    return new Promise(resolve => {
        resolve({
            response: {
                ts: new Date().getTime()
            }
        })
    })

};

module.exports = {
    getData,
};