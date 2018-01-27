// 3rd party modules
const Promise = require('bluebird');

class Addon {
  constructor({name, app, server, io, eventBus, logger}) {
    // Own variables
    this._name = name;
    this._logger = logger;
    this._eventBus = eventBus;
    this._server = server;
    this._io = io;
  }
  get name() { return this._name; }
  get logger() { return this._logger; }
  get eventBus() { return this._eventBus; }
  get server() { return this._server; }
  get io() { return this._io; }

  register() {
    return Promise.reject('not implemented');
  }
  unregister() {
    return Promise.reject('not implemented');
  }
}

module.exports = Addon;
