const { readdirSync, statSync } = require('fs');
const Path = require('path');

const getFilePaths = (folderPath) => {
    const entries = readdirSync(folderPath).map((entries) =>
        Path.join(folderPath, entries)
    );
    const dirPath = entries.filter((entry) => statSync(entry).isFile());
    const dirFiles = entries
        .filter((entry) => !dirPath.includes(entry))
        .reduce((entry, entries) => entry.concat(getFilePaths(entries)), []);
    return [...dirPath, ...dirFiles];
};

module.exports = getFilePaths;
