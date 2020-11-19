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

        const block = this.api
            .getServer()
            .getBlockManager()
            .getBlock('minecraft:bedrock');

        const chunk = new Chunk(pos.getX(), pos.getZ());

        chunk.setBlock(0, 60, 0, block);

        return;
    }
};
