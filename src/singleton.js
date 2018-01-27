// native modules
const fs = require('fs');
const path = require('path');

//  3rd party modules
const Promise = require('bluebird');
const uuid = require('uuid');

const fsWriteFile = Promise.promisify(fs.writeFile);
const fsReadFile = Promise.promisify(fs.readFile);
const fsUnlink = Promise.promisify(fs.unlink);


function isSingleton(base, lockFilePath = __dirname) {
  class Singleton extends base {
    constructor(...args) {
      super(...args);
      this.__instance = `${uuid()}`;
      this._cleanup = () =>
        this._unlock()
    }
    get _instanceId() {
      return this.__instance;
    }
    static get _lockFile() {
      return path.resolve(lockFilePath, `${base.name}.lock`);
    }
    register(...args) {
      return this._trylock()
        .then((locked) => {
          if (locked) {
            process.once('SIGINT', this._cleanup);
            process.once('beforeExit', this._cleanup);
            return super.register(...args)
              .catch(err => this._unlock()
                .then(() => {
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

    _tryUnlock() {
      return fsReadFile(Singleton._lockFile)
        .then(data => data.toString() === this._instanceId)
        .then((mine) => {
          if (mine) {
            return this._unlock();
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

    _unlock() {
      return fsUnlink(Singleton._lockFile).return(true);
    }
  }
  return Singleton;
}
module.exports = isSingleton;
