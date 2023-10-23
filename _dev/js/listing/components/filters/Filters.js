import prestashop from 'prestashop';
import FiltersRangeSliders from './FiltersRangeSliders';
import { on } from '../../../utils/event/eventHandler';

class Filters {
  constructor() {
    this.body = document.querySelector('body');
    this.setEvents();
    this.rangeSliders = FiltersRangeSliders;
    this.rangeSliders.init();
  }

  setEvents() {
    prestashop.on('updatedProductList', () => {
      prestashop.pageLoader.hideLoader();
      this.rangeSliders.init();
    });

    prestashop.on('updateFacets', () => {
      prestashop.pageLoader.showLoader();
    });

    on(this.body, 'click', '.js-search-link', (event) => {
      event.preventDefault();
      prestashop.emit('updateFacets', event.target.closest('a').href);
    });

    on(this.body, 'change', '[data-action="search-select"]', ({ target }) => {
      const selectedElement = target.options[target.selectedIndex];

      prestashop.emit('updateFacets', selectedElement.dataset.href);
    });

    on(this.body, 'click', '.js-search-filters-clear-all', (event) => {
      prestashop.emit('updateFacets', this.constructor.parseSearchUrl(event));
    });

    on(this.body, 'change', '#search_filters input[data-search-url]', (event) => {
      prestashop.emit('updateFacets', this.constructor.parseSearchUrl(event));
    });
  }

  static parseSearchUrl({ target }) {
    if (target.dataset.searchUrl !== undefined) {
      return target.dataset.searchUrl;
    }

    if (target.parent.dataset.searchUrl === undefined) {
      throw new Error('Can not parse search URL');
    }

    return target.parent.dataset.searchUrl;
  }
}

export default Filters;
