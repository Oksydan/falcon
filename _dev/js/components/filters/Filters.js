import prestashop from 'prestashop';
import $ from 'jquery';
import FiltersRangeSliders from './FiltersRangeSliders';

class Filters {
  constructor() {
    this.$body = $('body');
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

    this.$body.on('change', '#search_filters select', ({target}) => {
      const form = $(target).closest('form');
      prestashop.emit('updateFacets', `?${form.serialize()}`);
    });

    this.$body.on('click', '.js-search-link', (event) => {
      event.preventDefault();
      prestashop.emit('updateFacets', $(event.target).closest('a').get(0).href);
    });

    this.$body.on('change', '[data-action="search-select"]', ({target}) => {
      prestashop.emit('updateFacets', $(target).find('option:selected').data('href'));
    });

    this.$body.on('click', '.js-search-filters-clear-all', (event) => {
      prestashop.emit('updateFacets', this.constructor.parseSearchUrl(event));
    });

    this.$body.on('change', '#search_filters input[data-search-url]', (event) => {
      prestashop.emit('updateFacets', this.constructor.parseSearchUrl(event));
    });
  }

  static parseSearchUrl(event) {
    if (event.target.dataset.searchUrl !== undefined) {
      return event.target.dataset.searchUrl;
    }

    if ($(event.target).parent()[0].dataset.searchUrl === undefined) {
      throw new Error('Can not parse search URL');
    }

    return $(event.target).parent()[0].dataset.searchUrl;
  }
}

export default Filters;
