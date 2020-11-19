const Generator = require('../base/BaseGenerator');

module.exports = class CustomFlat extends Generator {
    constructor(api, config) {
        super({
            api,
            config,
            id: 'EmptyWorld'
        });
    }

    getChunk({ pos, seed, server }) {
        const Chunk = this.api
            .getServer()
            .getWorldManager()
            .getGeneratorManager()
            .getChunkClass().default;

        return new Chunk(pos.getX(), pos.getZ());
    }
};
