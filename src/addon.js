// 3rd party modules
const Promise = require('bluebird');
const _ = require('lodash');

class Addon {
  constructor(...args) {
    // Own variables
    const {
      name,
      app,
      server,
      io,
      eventBus,
      logger,
      settings,
      mongoose
    } = Addon.parseArgs(...args);
    this._name = name;
    this._logger = logger;
    this._eventBus = eventBus;
    this._server = server;
    this._io = io;
    this._app = app;
    this._settings = settings;
    this._mongoose = mongoose;
  }
  get name() { return this._name; }
  get logger() { return this._logger; }
  get eventBus() { return this._eventBus; }
  get server() { return this._server; }
  get io() { return this._io; }
  get app() { return this._app; }
  get settings() { return this._settings; }
  get mongoose() { return this._mongoose; }

  static parseArgs(...args) {
    if (args.length === 1 && _.isObject(args[0])) {
      return args[0];
    }
    return {
      app: args[0],
      server: args[1],
      io: args[2],
      eventBus: args[3],
      logger: args[4],
      settings: args[5],
      mongoose: args[6]
    };
  }
  register() {
    return Promise.resolve(`${this.name} does not implemented register()`);
  }
  unregister() {
    return Promise.resolve(`${this.name} does not implemented unregister()`);
  }
}

module.exports = Addon;
