import DynamicImportJqueryPlugin from '@js/theme/utils/DynamicImportJqueryPlugin';
import DynamicImportDOMEvents from '@js/theme/utils/DynamicImportDOMEvents';

export default class DynamicImportHandler {
  constructor({
    files,
    jqueryPluginCover = null,
    enableObserve = false,
    observeOptions = false,
    DOMEvents = false,
    DOMEventsSelector = false,
    DOMEventsPreventDefault = false,
    onLoadFiles = () => {},
  } = {}) {
    this.files = files;
    this.jqueryPluginCover = jqueryPluginCover;
    this.enableObserve = enableObserve;
    this.observeOptions = observeOptions;
    this.onLoadFiles = onLoadFiles;

    this.jqueryDynamicImport = false;
    this.dynamicDOMEvents = false;
    this.filesLoaded = false;

    if (jqueryPluginCover) {
      this.jqueryDynamicImport = new DynamicImportJqueryPlugin({
        jqueryPluginCover,
        importer: this,
      });
    }
    if (DOMEvents && DOMEventsSelector) {
      this.dynamicDOMEvents = new DynamicImportDOMEvents({
        events: DOMEvents,
        eventSelector: DOMEventsSelector,
        preventDefault: DOMEventsPreventDefault,
        importer: this,
      });
    }
  }

  loadFiles(callback = () => {}) {
    if (!this.filesLoaded) {
      Promise.all(this.files()).then((res) => {
        callback();
        this.onLoadFiles(res);
      });

      this.filesLoaded = true;
    }
  }
}
