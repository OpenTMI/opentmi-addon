// 3rd party modules
const {expect} = require('chai');

// application module
const Addon = require('../src/addon');

describe('addon', function () {
  it('can parse args', function () {
    const addon = new Addon(1, 2, 3, 4, 5, 6, 7);
    expect(addon.app).to.be.equal(1);
    expect(addon.server).to.be.equal(2);
    expect(addon.io).to.be.equal(3);
    expect(addon.eventBus).to.be.equal(4);
    expect(addon.logger).to.be.equal(5);
    expect(addon.settings).to.be.equal(6);
    expect(addon.mongoose).to.be.equal(7);
  });
  it('can parse args from object', function () {
    const options = {
      app: 1,
      server: 2,
      io: 3,
      eventBus: 4,
      logger: 5,
      settings: 6,
      mongoose: 7
    };
    const addon = new Addon(options);
    expect(addon.app).to.be.equal(1);
    expect(addon.server).to.be.equal(2);
    expect(addon.io).to.be.equal(3);
    expect(addon.eventBus).to.be.equal(4);
    expect(addon.logger).to.be.equal(5);
    expect(addon.settings).to.be.equal(6);
    expect(addon.mongoose).to.be.equal(7);
  });
});
