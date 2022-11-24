class FiltersUrlHandler {
  constructor() {
    this.baseUrl = window.location.origin + window.location.pathname;
    this.oldSearchUrl = null;
    this.searchUrl = null;
  }

  setOldSearchUrl() {
    this.oldSearchUrl = this.searchUrl;
  }

  getFiltersUrl() {
    this.setOldSearchUrl();
    return `${this.baseUrl}?q=${this.searchUrl}`;
  }

  setSearchUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    this.searchUrl = searchParams.get('q');
    this.oldSearchUrl = searchParams.get('q');
  }

  setRangeParams(group, { unit, from, to }) {
    this.removeGroup(group);

    this.appendParam(group, unit);
    this.appendParam(group, from);
    this.appendParam(group, to);
  }

  appendParam(group, prop) {
    const oldSearchUrl = this.searchUrl || '';
    let newSearchUrl = oldSearchUrl.length ? oldSearchUrl.split('/') : [];
    let groupExist = false;
    const newSearchUrlLength = newSearchUrl.length;
    group = FiltersUrlHandler.specialEncode(group);
    prop = FiltersUrlHandler.specialEncode(prop);

    for (let i = 0; i < newSearchUrlLength; i += 1) {
      const filterGroup = newSearchUrl[i];
      const filterGroupArray = filterGroup.split('-');

      if (filterGroupArray[0] === group) {
        newSearchUrl[i] = `${newSearchUrl[i]}-${prop}`;
        groupExist = true;
        break;
      }
    }

    if (!groupExist) {
      newSearchUrl = [...newSearchUrl, `${group}-${prop}`];
    }

    this.searchUrl = FiltersUrlHandler.specialDecode(FiltersUrlHandler.formatSearchUrl(newSearchUrl));
  }

  removeGroup(group) {
    const oldSearchUrl = this.searchUrl || '';
    const newSearchUrl = oldSearchUrl.length ? oldSearchUrl.split('/') : [];
    const newSearchUrlLength = newSearchUrl.length;

    for (let i = 0; i < newSearchUrlLength; i += 1) {
      const filterGroup = newSearchUrl[i];
      const filterGroupArray = filterGroup.split('-');

      if (filterGroupArray[0] === group) {
        newSearchUrl.splice(i, 1);
      }
    }

    this.searchUrl = FiltersUrlHandler.specialDecode(FiltersUrlHandler.formatSearchUrl(newSearchUrl));
  }

  static toString(value) {
    return `${value}`;
  }

  static specialEncode(str) {
    return FiltersUrlHandler.toString(str).replace('/', '[slash]');
  }

  static specialDecode(str) {
    return FiltersUrlHandler.toString(str).replace('[slash]', '/');
  }

  removeParam(group, prop) {
    const oldSearchUrl = this.searchUrl || '';
    const newSearchUrl = oldSearchUrl.length ? oldSearchUrl.split('/') : [];
    const newSearchUrlLength = newSearchUrl.length;

    for (let i = 0; i < newSearchUrlLength; i += 1) {
      const filterGroup = newSearchUrl[i];
      const filterGroupArray = filterGroup.split('-');

      if (filterGroupArray[0] === group) {
        const filterResult = filterGroupArray.filter((el) => el !== prop);

        if (filterResult.length === 1) {
          newSearchUrl.splice(i, 1);
        } else {
          newSearchUrl[i] = filterResult.join('-');
        }
        break;
      }
    }

    this.searchUrl = FiltersUrlHandler.specialDecode(FiltersUrlHandler.formatSearchUrl(newSearchUrl));
  }

  static formatSearchUrl(array) {
    return array.join('/');
  }
}

export default FiltersUrlHandler;
