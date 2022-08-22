class DynamicImportSwiperModule {
  constructor(getFiles) {
    this.getFiles = getFiles;
  }

  getModule() {
    return Promise.all(this.getFiles());
  }
}

export default DynamicImportSwiperModule;
