/* eslint-disable indent */
const Generator = require('../base/BaseGenerator');

module.exports = class CustomFlat extends Generator {
    constructor(api, config) {
        super({
            api,
            config,
            id: 'CustomFlat'
        });

        this.defaultOptions = {
            biome: 0,
            layers: [
                { count: 1, block: 'minecraft:bedrock' },
                { count: 3, block: 'minecraft:dirt' },
                { count: 1, block: 'minecraft:grass' }
            ]
        };

        //Bedrock default:
        //{
        //    biome_id: 1,
        //    block_layers: [
        //        { block_data: 0, block_id: 7, count: 1 },
        //        { block_data: 0, block_id: 3, count: 2 },
        //        { block_data: 0, block_id: 2, count: 1 }
        //    ],
        //    encoding_version: 3,
        //    structure_options: null
        //};
    }

    getChunk({ pos, seed, server }) {
        const BlockManager = server.getBlockManager();
        const Chunk = server
            .getWorldManager()
            .getGeneratorManager()
            .getChunkClass();

        const chunk = new Chunk(pos.getX(), pos.getZ());

        let y = 0;
        this.getConfig().layers.forEach((layer) => {
            const block =
                typeof layer.block === 'string'
                    ? BlockManager.getBlock(layer.block)
                    : BlockManager.getBlockByIdAndMeta(
                          layer.block.id,
                          layer.block.meta || 0
                      );

            const limit = y + layer.count < 256 ? y + layer.count : 256;

            for (; y < limit; y++) {
                for (let x = 0; x < 16; x++) {
                    for (let z = 0; z < 16; z++) {
                        chunk.setBlock(x, y, z, block);
                    }
                }
            }
        });

        return chunk;
    }
};
