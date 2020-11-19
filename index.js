/* eslint-disable no-console */
const { readdirSync, statSync } = require('fs');
const Path = require('path');

class customWorld {
    constructor(api) {
        this.api = api;
        this.config = this.api.getConfigBuilder('generatorSettings.json');
        this.loadGenerators(Path.join(__dirname, 'src', 'generators'));
    }

    loadGenerators(filePath) {
        let generators = this.getFiles(filePath);

        generators.forEach((generatorPath) => {
            const generator = new (require(generatorPath))(
                this.api,
                this.config
            );

            const generatorManager = this.api
                .getServer()
                .getWorldManager()
                .getGeneratorManager();

            generatorManager.generators.set(generator.getId(), generator);
            console.log(generatorManager);

            this.api
                .getLogger()
                .info(`Loaded generator §a"${generator.getId()}"`);
        });
    }

    onEnable() {
        this.api.getLogger().info('ready');
    }

    onDisable() {
        this.api.getLogger().info('disabled');
    }

    getFiles(folderPath) {
        const entries = readdirSync(folderPath).map((entries) =>
            Path.join(folderPath, entries)
        );
        const dirPath = entries.filter((entry) => statSync(entry).isFile());
        const dirFiles = entries
            .filter((entry) => !dirPath.includes(entry))
            .reduce(
                (entry, entries) => entry.concat(this.getFiles(entries)),
                []
            );
        return [...dirPath, ...dirFiles];
    }
}

module.exports.default = customWorld;
