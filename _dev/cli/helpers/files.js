const fs = require('fs');
const path = require('path');

export const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

export const directoryExists = (filePath) => {
  return fs.existsSync(filePath);
};
