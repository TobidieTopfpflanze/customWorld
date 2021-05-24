const Path = require('path');
const getFilePaths = require('../utils/getFilePaths');

class GeneratorManager {
    constructor(plugin) {
        this.plugin = plugin;
        this.loadGenerators(Path.join(__dirname, '..', 'generators'));
    }

    loadGenerators(filePath) {
        getFilePaths(filePath).forEach((generatorPath) => {
            const generator = new (require(generatorPath))(
                this.plugin.api,
                this.plugin.config
            );

            this.plugin.api
                .getServer()
                .getWorldManager()
                .getGeneratorManager()
                .generators.set(generator.getId(), generator);

            this.api
                .getLogger()
                .info(`Loaded generator §a"${generator.getId()}"`);
        });
    }
}

module.exports = GeneratorManager;
