module.exports = class Generator {
    constructor({ api, config, id, defaultOptions = {} }) {
        this.api = api;
        this.id = id;
        this.config = config;
        this.defaultOptions = defaultOptions;
    }

    getConfig() {
        return this.config.get(this.getId(), this.getDefaultOptions());
    }

    getId() {
        return this.id;
    }

    getDefaultOptions() {
        return this.defaultOptions;
    }
};
