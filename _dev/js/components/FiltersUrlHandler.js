
class FiltersUrlHandler {
  constructor() {
    this.baseUrl = window.location.origin + window.location.pathname;
    this.oldSearchUrl = null;
    this.searchUrl = null;
  }

  getFiltersUrl() {
    return this.baseUrl + '?q=' + this.searchUrl;
  }

  setSearchUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    this.searchUrl = searchParams.get('q');
    this.oldSearchUrl = searchParams.get('q');
  }

  setRangeParams(group, {unit, from, to}) {
    this.removeGroup(group);

    this.appendParam(group, unit);
    this.appendParam(group, from);
    this.appendParam(group, to);
  }

  appendParam(group, prop) {
    const oldSearchUrl = this.searchUrl || '';
    let newSearchUrl = oldSearchUrl.split('/');
    let groupExist = false;

    for(let i in newSearchUrl) {
      const filterGroup = newSearchUrl[i];
      const filterGroupArry = filterGroup.split('-');
      if(filterGroupArry[0] == group) {
        newSearchUrl[i] = newSearchUrl[i] + "-" + prop;
        groupExist = true;
        break;
      }
    }

    if(!groupExist) {
      newSearchUrl = [...newSearchUrl, group + '-' + prop]
    }

    this.searchUrl = this.formatSearchUrl(newSearchUrl);
  }

  removeGroup(group) {
    const oldSearchUrl = this.searchUrl || '';
    let newSearchUrl = oldSearchUrl.split('/');

    for(let i in newSearchUrl) {
      const filterGroup = newSearchUrl[i];
      const filterGroupArray = filterGroup.split('-');

      if(filterGroupArray[0] == group) {
        newSearchUrl.splice(i, 1);
      }
    }

    this.searchUrl = this.formatSearchUrl(newSearchUrl);
  }

  removeParam(group, prop) {
    const oldSearchUrl = this.searchUrl || '';
    let newSearchUrl = oldSearchUrl.split('/');

    for(let i in newSearchUrl) {
      const filterGroup = newSearchUrl[i];
      const filterGroupArry = filterGroup.split('-');

      if(filterGroupArry[0] == group) {
        const filterRestul = filterGroupArry.filter(el => el !== prop);

        if(filterRestul.length == 1) {
          newSearchUrl.splice(i, 1);
        } else {
          newSearchUrl[i] = filterRestul.join('-');
        }
        break;
      }
    }

    this.searchUrl = this.formatSearchUrl(newSearchUrl);
  }

  formatSearchUrl(arry) {
    return arry.join('/');
  }

}

export default FiltersUrlHandler;
