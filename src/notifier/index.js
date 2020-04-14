const EventEmitter = require('events').EventEmitter;
const notifier = new EventEmitter();

exports.emit = (eventName, message) => {
  notifier.emit(eventName, message)
};

exports.on = (eventName, cb) => {
  notifier.on(eventName, cb);
};

exports.EventMessage = class {

  constructor(eventName, action, status, metadata = {}) {
      this.eventName = eventName;
      this.action = action;
      this.status = status;
      this.metadata = metadata;
  }

  emit() {
      notifier.emit(this.eventName, {
          date: new Date().getTime(),
          action: this.action,
          status: this.status,
          metadata: this.metadata
      })
  }
};