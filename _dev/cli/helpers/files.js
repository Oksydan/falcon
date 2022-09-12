const fs = require('fs');
const path = require('path');

exports.getCurrentDirectory = () => process.cwd();

exports.getDirectoryName = (directory) => path.basename(directory);

exports.directoryExists = (filePath) => fs.existsSync(filePath);

exports.fileExists = (filePath) => fs.existsSync(filePath);
