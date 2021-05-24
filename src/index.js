/* eslint-disable no-console */
const GeneratorManager = require('./core/GeneratorManager');

class customWorld {
    constructor(api) {
        this.api = api;
        this.config = this.api.getConfigBuilder('generatorSettings.json');
        this.generatorManager = new GeneratorManager(this);
    }

    onEnable() {
        this.api.getLogger().info('ready');
    }

    onDisable() {
        this.api.getLogger().info('disabled');
    }
}

module.exports.default = customWorld;

let a = {
    key: 10,
    someOtherKey: 'value',
    'key with space': (param) => {
        return param === 1;
    }
};
a.key;
a['key with space'];

const arr = [1, 2, 3, 4, 5, 'string'];
arr[0];
