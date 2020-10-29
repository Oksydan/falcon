import $ from 'jquery';

export default class DynamicImportHandler {
  constructor({
    files,
    jqueryPluginCover = null,
  }) {
    this.files = files;
    this.jqueryPluginCover = jqueryPluginCover;
    this.jqueryElementCalled = null;
    this.jqueryElementCalledArgs = null;
  }

  init() {
    this.setJqueryPlugin();
    // this.loadFiles();
  }

  loadFiles() {
    Promise.all(this.files()).then(() => {
      this.callJqueryAction();
    });
  }

  callJqueryAction() {
    this.jqueryElementCalled[this.jqueryPluginCover](this.jqueryElementCalledArgs);
  }

  setJqueryPlugin() {
    if (!this.jqueryPluginCover) {
      return;
    }

    const self = this;

    $.fn[this.jqueryPluginCover] = function (args) {
      self.jqueryElementCalled = this;
      self.jqueryElementCalledArgs = args;
      self.loadFiles();
    };
  }
}
