const Generator = require('../core/Generator');
const {
    default: Chunk
} = require('@jsprismarine/prismarine/dist/src/world/chunk/Chunk');

class Debug extends Generator {
    constructor(api, config) {
        super({
            api,
            config,
            id: 'Debug'
        });

        this.defaultOptions = {
            creativeBlocks: true,
            educatioBlocks: true,
            chunkWidth: 5,
            blockHeight: 5
        };

        this.index = 0;
        this.blocks = this.api
            .getServer()
            .getBlockManager()
            .getBlocks()
            .sort((a, b) => a.getId() - b.getId());
    }

    getChunk({ pos, seed, server }) {
        const chunk = new Chunk(pos.getX(), pos.getZ());
        if (
            chunk.getZ() > this.getConfig().chunkWidth - 1 ||
            chunk.getZ() < 0 ||
            chunk.getX() < 0
        )
            return chunk;

        for (let x = 0; x < 16; x = x + 2) {
            for (let z = 0; z < 16; z = z + 2) {
                if (chunk.getX() === 0) {
                    let id =
                        Math.floor(z / 2) +
                        chunk.getZ() * 8 +
                        4 * this.getConfig().chunkWidth * x;
                    if (this.blocks[id]) {
                        chunk.setBlock(
                            x,
                            this.getConfig().blockHeight,
                            z,
                            this.blocks[id]
                        );
                    }
                }
            }
        }

        return chunk;
    }
}

module.exports = Debug;
