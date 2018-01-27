# OpenTMI addon base class



## API

### `Addon`

This is base class which stores some basic things, like logger instance, eventBus etc.

**getters**
* `this.logger` to get logger instance
* `this.eventBus` to get opentmi eventBus instance
* `this.app` to get opentmi express application instance
* `this.server` to get express server instance
* `this.io` to get socket.io instance


Usage example:

```
const {Addon} = require('opentmi-addon');

class MyAddon extends Addon {
    constructor(...data) {
        super(...data);
        this.logger.info('MyAddon constructor');
    }
}
module.exports = MyAddon;
```

### `singleton()`

singleton mixer can be used to create addon which manage some
background operations like analyse results. Those background operations
is activated when `register` -function is called.
Note that `register` is called only once even opentmi is started cluster mode.


Usage example:
```
const {Addon, singleton} = require('opentmi-addon');
class MyAddon extends Addon {
    constructor(...data) {
        super(...data);
        this.logger.info('MyAddon constructor');
    }
}
const MySingletonAddon = singleton(MyAddon);
module.exports = MySingletonAddon;
```
