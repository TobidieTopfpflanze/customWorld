const Generator = require('../base/BaseGenerator');

module.exports = class CustomFlat extends Generator {
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
    }

    getChunk({ pos, seed, server }) {
        const Chunk = server
            .getWorldManager()
            .getGeneratorManager()
            .getChunkClass();

        const chunk = new Chunk(pos.getX(), pos.getZ());
        const blocks = server.getBlockManager().getBlocks();
        if (chunk.getX() > this.getConfig().chunkWidth) return chunk;

        for (let x = 0; x < 16; x = x + 2) {
            for (let z = 0; z < 16; z = z + 2) {
                if (blocks[pos.getZ() * 16 + z]) {
                    chunk.setBlock(
                        x,
                        this.getConfig().blockHeight,
                        z,
                        blocks[pos.getZ() * 16 + z]
                    );
                } else {
                    return chunk;
                }
            }
        }

        return chunk;
    }
};
