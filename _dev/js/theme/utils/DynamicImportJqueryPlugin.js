import $ from 'jquery';

class DynamicImportJqueryPlugin {
  constructor({
    jqueryPluginCover,
    importer,
  } = {}) {
    this.jqueryPluginCover = jqueryPluginCover;
    this.importer = importer;
    this.jqueryFuncCalled = [];

    this.setJqueryPlugin();
  }

  callJqueryAction() {
    for (const fncCall of this.jqueryFuncCalled) {
      fncCall.elem[this.jqueryPluginCover](fncCall.args);
    }
  }

  fetchFiles() {
    this.importer.loadFiles(() => this.callJqueryAction());
  }

  setJqueryPlugin() {
    const self = this;

    /* eslint-disable func-names */
    $.fn[this.jqueryPluginCover] = function (args) {
      self.jqueryFuncCalled.push({
        elem: this,
        args,
      });
      self.fetchFiles();

      return this;
    };
  }
}

export default DynamicImportJqueryPlugin;
