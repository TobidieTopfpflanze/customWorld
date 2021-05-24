const Generator = require('../core/Generator');
const {
    default: Chunk
} = require('@jsprismarine/prismarine/dist/src/world/chunk/Chunk');

class EmptyWorld extends Generator {
    constructor(api, config) {
        super({
            api,
            config,
            id: 'EmptyWorld'
        });
    }

    getChunk({ pos, seed, server }) {
        const block = server.getBlockManager().getBlock('minecraft:bedrock');

        const chunk = new Chunk(pos.getX(), pos.getZ());

        chunk.setBlock(0, 60, 0, block);

        return;
    }
}

module.exports = EmptyWorld;
