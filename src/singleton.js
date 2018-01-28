// native modules
const fs = require('fs');
const path = require('path');

//  3rd party modules
const Promise = require('bluebird');
const uuid = require('uuid');
const invariant = require('invariant');
const _ = require('lodash');

const fsWriteFile = Promise.promisify(fs.writeFile);
const fsReadFile = Promise.promisify(fs.readFile);
const fsUnlink = Promise.promisify(fs.unlink);


function isSingleton(base, lockFilePath = __dirname) {
  class Singleton extends base {
    constructor(...args) {
      super(...args);
      this.__instance = `${uuid()}`;
      this._registered = false;
      this._cleanup = () =>
        Singleton._unlock();
    }
    get _instanceId() {
      return this.__instance;
    }
    get isRegistered() {
      return this._registered;
    }
    static get _lockFile() {
      return path.resolve(lockFilePath, `${base.name}.lock`);
    }
    register(...args) {
      return this._trylock()
        .then((locked) => {
          if (locked) {
            this._registered = true;
            process.once('SIGINT', this._cleanup);
            process.once('beforeExit', this._cleanup);
            invariant(_.isFunction(super.register), 'addon does not have register function');
            return super.register(...args)
              .catch(err => Singleton._unlock()
                .then(() => {
                  this._registered = false;
                  throw err;
                }));
          }
          return undefined;
        });
    }
    unregister(...args) {
      return this._tryUnlock()
        .then((success) => {
          if (success) {
            this._registered = false;
            process.removeListener('SIGINT', this._cleanup);
            process.removeListener('beforeExit', this._cleanup);
            return super.unregister(...args);
          }
          return undefined;
        });
    }

    _trylock() {
      const data = `${this._instanceId}`;
      return fsWriteFile(Singleton._lockFile, data, {flag: 'wx'})
        .return(true)
        .catch((error) => {
          if (error.code === 'EEXIST') {
            return Promise.resolve(false);
          }
          throw error;
        });
    }

    isSingletonInstance() {
      return fsReadFile(Singleton._lockFile)
        .then(data => data.toString() === this._instanceId);
    }

    _tryUnlock() {
      return this.isSingletonInstance()
        .then((mine) => {
          if (mine) {
            return Singleton._unlock();
          }
          return undefined;
        })
        .catch((error) => {
          if (error.code === 'EEXIST') {
            return Promise.resolve(false);
          }
          throw error;
        });
    }

    static _unlock() {
      return fsUnlink(Singleton._lockFile).return(true);
    }
  }
  return Singleton;
}
module.exports = isSingleton;
