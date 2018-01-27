// 3rd party modules
const Promise = require('bluebird');
const {expect} = require('chai');
const {mock} = require('sinon');

// application module
const Addon = require('../src/addon');

describe('addon', function () {
  it('can parse args', function () {
    const addon = new Addon(1, 2, 3, 4, 5, 6);
    expect(addon.app).to.be.equal(1);
    expect(addon.server).to.be.equal(2);
    expect(addon.io).to.be.equal(3);
    expect(addon.eventBus).to.be.equal(4);
    expect(addon.logger).to.be.equal(5);
    expect(addon.name).to.be.equal(6);
  });
  it('can parse args from object', function () {
    const addon = new Addon({app: 1, server: 2, io: 3, eventBus: 4, logger: 5, name: 6});
    expect(addon.app).to.be.equal(1);
    expect(addon.server).to.be.equal(2);
    expect(addon.io).to.be.equal(3);
    expect(addon.eventBus).to.be.equal(4);
    expect(addon.logger).to.be.equal(5);
    expect(addon.name).to.be.equal(6);
  });
});
