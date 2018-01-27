// 3rd party modules
const Promise = require('bluebird');
const {expect} = require('chai');
const {mock} = require('sinon');

// application  module
const isSingleton = require('../src/singleton');

class TestClass {
  constructor() {
    this._register = mock().returns(Promise.resolve());
    this._unregister = mock().returns(Promise.resolve());
  }
  register(...args) {
    return this._register(...args);
  }
  unregister(...args) {
    return this._unregister(...args);
  }
}

describe('singleton', function() {
  it('is singleton', function() {
    const STest = isSingleton(TestClass);
    expect(STest.name).to.be.equal('Singleton');
  });
  it('behaviours like singleton', function() {
    const STest = isSingleton(TestClass);
    const test1 = new STest();
    const pending1 = test1.register()
      .then(() => Promise.delay(1000))
      .then(() => test1.unregister());
    const test2 = new STest();
    const pending2 = test2.register()
      .then(() => Promise.delay(400))
      .then(() => test2.unregister());
    return Promise
      .all([pending1, pending2])
      .then(() => {
        expect(test1._register.calledOnce).to.be.true;
        expect(test2._register.called).to.be.false;
        expect(test1._unregister.calledOnce).to.be.true;
        expect(test2._unregister.called).to.be.false;
      });
  });
});
