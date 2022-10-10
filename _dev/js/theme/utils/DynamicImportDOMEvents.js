import $ from 'jquery';

class DynamicImportDOMEvents {
  constructor({
    importer,
    events,
    eventSelector,
    preventDefault,
  } = {}) {
    this.eventSelector = eventSelector;
    this.events = events;
    this.eventsArray = events.split(' ');
    this.preventDefault = preventDefault;
    this.importer = importer;
    this.fetchFiles = this.fetchFiles.bind(this);

    this.bindEvents();
  }

  fetchFiles(e = false) {
    if (e && this.preventDefault) {
      e.preventDefault();
    }

    this.importer.loadFiles(() => {
      if (e && this.eventsArray.includes(e.type)) {
        $(e.target).trigger(e.type);
        this.unbindEvents();
      }
    });
  }

  bindEvents() {
    $(document).on(this.events, this.eventSelector, this.fetchFiles);
  }

  unbindEvents() {
    $(document).off(this.events, this.eventSelector, this.fetchFiles);
  }
}

export default DynamicImportDOMEvents;
