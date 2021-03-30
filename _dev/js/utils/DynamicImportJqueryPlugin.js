import $ from 'jquery';

class DynamicImportJqueryPlugin {
  constructor({
    jqueryPluginCover,
    importer,
  } = {}) {
    this.jqueryPluginCover = jqueryPluginCover;
    this.importer = importer;
    this.jqueryElementCalled = null;
    this.jqueryElementCalledArgs = null;

    this.setJqueryPlugin();
  }

  callJqueryAction() {
    if (this.jqueryElementCalled.length) {
      this.jqueryElementCalled[this.jqueryPluginCover](this.jqueryElementCalledArgs);
    }
  }

  fetchFiles() {
    this.importer.loadFiles(() => this.callJqueryAction());
  }

  setJqueryPlugin() {
    const self = this;

    /* eslint-disable func-names */
    $.fn[this.jqueryPluginCover] = function (args) {
      self.jqueryElementCalled = this;
      self.jqueryElementCalledArgs = args;
      self.fetchFiles();
    };
  }
}

export default DynamicImportJqueryPlugin;
