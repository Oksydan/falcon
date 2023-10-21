import prestashop from 'prestashop';
import Filters from '@js/listing/components/filters/Filters';
import parseToHtml from '../theme/utils/parseToHtml';
import { each } from '../theme/utils/DOMHelpers';
import DOMReady from '../theme/utils/DOMReady';

function updateProductListDOM(data) {
  each(prestashop.selectors.listing.searchFilters, (el) => {
    el.replaceWith(parseToHtml(data.rendered_facets));
  });
  each(prestashop.selectors.listing.activeSearchFilters, (el) => {
    el.replaceWith(parseToHtml(data.rendered_active_filters));
  });
  each(prestashop.selectors.listing.listTop, (el) => {
    el.replaceWith(parseToHtml(data.rendered_products_top));
  });
  each(prestashop.selectors.listing.listBottom, (el) => {
    el.replaceWith(parseToHtml(data.rendered_products_bottom));
  });
  each(prestashop.selectors.listing.list, (el) => {
    el.replaceWith(parseToHtml(data.rendered_products));
  });

  if (data.rendered_products_header) {
    each(prestashop.selectors.listing.listHeader, (el) => {
      el.replaceWith(parseToHtml(data.rendered_products_header));
    });
  }

  prestashop.emit('updatedProductList', data);
}

DOMReady(() => {
  /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "filters" }] */
  const filters = new Filters();

  prestashop.on('updateProductList', (data) => {
    updateProductListDOM(data);
    window.scrollTo(0, 0);
  });

  prestashop.on('updatedProductList', () => {
    prestashop.pageLazyLoad.update();
  });
});
