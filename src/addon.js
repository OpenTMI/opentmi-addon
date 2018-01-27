// 3rd party modules
const Promise = require('bluebird');

class Addon {
  constructor({
    name, app, server, io, eventBus, logger
  }) {
    // Own variables
    this._name = name;
    this._logger = logger;
    this._eventBus = eventBus;
    this._server = server;
    this._io = io;
    this._app = app;
  }
  get name() { return this._name; }
  get logger() { return this._logger; }
  get eventBus() { return this._eventBus; }
  get server() { return this._server; }
  get io() { return this._io; }
  get app() { return this._app; }

  register() {
    return Promise.resolve(`${this.name} does not implemented register()`);
  }
  unregister() {
    return Promise.resolve(`${this.name} does not implemented unregister()`);
  }
}

module.exports = Addon;
