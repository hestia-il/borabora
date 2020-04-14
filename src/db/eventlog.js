'use strict';
const notifier = require('../notifier');

notifier.on('eventlog', message => {
    console.log(message);
});