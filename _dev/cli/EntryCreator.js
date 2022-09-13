const { getCurrentDirectory, fileExists, directoryExists } = require('./helpers/files');
const path = require('path');
const fs = require('fs');
var getDirName = path.dirname;

const getJsFileTemplate = (entry) => `
// Your js code for entry - ${entry}
`;

const getCssFileTemplate = (entry) => `
@import "abstracts/index";
@import "${entry}/index";
`;

module.exports = class EntryCreator {
  constructor (entryName) {
    this.themeScssPath = '';
    this.themeJsPath = '';
    this.entryName = entryName;
  }

  setEntryName(name) {
    this.entryName = name;
  }

  setupThemeDirs() {
    this.themeScssPath = this.getThemeScssPath();
    this.themeJsPath = this.getThemeJsPath();
    console.log(this);
  }

  getThemeScssPath() {
    const cssPath = path.resolve(getCurrentDirectory(), './css');

    if (!directoryExists(cssPath)) {
      throw new Error(`Css theme directory not exists`)
    } else {
      return cssPath;
    }
  }

  getThemeJsPath() {
    const jsPath = path.resolve(getCurrentDirectory(), './js');

    if (!directoryExists(jsPath)) {
      throw new Error(`JS theme directory not exists`)
    } else {
      return jsPath;
    }
  }

  isEntryNameValid() {
    return true;
  }

  checkIfEntryAlreadyExists() {
    return false;
  }

  async generateEntry() {
    await this.generateEntryForScss();
    await this.generateEntryForJs();
  }

  async writeFile(path, contents) {
    try {
      await fs.promises.mkdir(getDirName(path), { recursive: true })
    } catch (error) {
      throw new Error(error)
    }

    try {
      await fs.promises.writeFile(path, contents)
    } catch (error) {
      throw new Error(error)
    }
  }

  async generateEntryForScss() {
    await this.writeFile(`${this.themeScssPath}/${this.entryName}.scss`, getCssFileTemplate(this.entryName));
    await this.writeFile(`${this.themeScssPath}/${this.entryName}/index.scss`, '');
  }

  async generateEntryForJs() {
    await this.writeFile(`${this.themeJsPath}/${this.entryName}.js`, getJsFileTemplate(this.entryName));
  }
}
