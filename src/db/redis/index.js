// todo: implement with redis

const tempStorage = Object.create(null);

module.exports = {

    set: (k, v) => {
        tempStorage[k] = v;
    },
    get: (k) => {
        return tempStorage[k];
    },
    del: (k) => {
        delete tempStorage[k];
    },
};