const { getCurrentDirectory, fileExists, getDirectoryName } = require('./helpers/files');
const path = require('path');
const fs = require('fs');

module.exports = class EnvCreator {
  constructor () {
    this.themeName = '';
    this.serverAddress = '';
    this.serverPort = '';
    this.physicalUri = '';

    this.setThemeName();
  }

  static detectIfEnvAlreadyExists() {
    return fileExists(EnvCreator.getEnvFilePath());
  }

  static getEnvFilePath() {
    return path.resolve(getCurrentDirectory(), './webpack/.env');
  }

  setThemeName() {
    const themeDir = path.resolve(getCurrentDirectory(), '../');
    this.themeName = getDirectoryName(themeDir);
  }

  buildSiteUrl() {
    return `http://${this.serverAddress}`;
  }

  buildPublicPath() {
    return `${this.physicalUri}themes/${this.themeName}/assets/`;
  }

  buildEnvFile() {
    const contentArray = [];
    contentArray.push(`PORT=${this.serverPort}`);
    contentArray.push(`SERVER_ADDRESS=${this.serverAddress}`);
    contentArray.push(`SITE_URL=${this.buildSiteUrl()}`);
    contentArray.push(`PUBLIC_PATH=${this.buildPublicPath()}`);

    this.writeEnvFile(contentArray.join('\n'));
  }

  writeEnvFile(content) {
    try {
      fs.writeFileSync(EnvCreator.getEnvFilePath(), content);
    } catch (err) {
      console.error(err);
    }
  }
}
