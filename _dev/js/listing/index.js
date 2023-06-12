import $ from 'jquery';
import prestashop from 'prestashop';
import Filters from '@js/listing/components/filters/Filters';

function updateProductListDOM(data) {
  $(prestashop.selectors.listing.searchFilters).replaceWith(
    data.rendered_facets,
  );
  $(prestashop.selectors.listing.activeSearchFilters).replaceWith(
    data.rendered_active_filters,
  );
  $(prestashop.selectors.listing.listTop).replaceWith(
    data.rendered_products_top,
  );

  const renderedProducts = $(data.rendered_products);
  const productSelectors = $(prestashop.selectors.listing.product);

  if (productSelectors.length > 0) {
    productSelectors.removeClass().addClass(productSelectors.first().attr('class'));
  } else {
    productSelectors.removeClass().addClass(renderedProducts.first().attr('class'));
  }

  $(prestashop.selectors.listing.list).replaceWith(renderedProducts);
  $(prestashop.selectors.listing.listBottom).replaceWith(data.rendered_products_bottom);

  if (data.rendered_products_header) {
    $(prestashop.selectors.listing.listHeader).replaceWith(data.rendered_products_header);
  }

  prestashop.emit('updatedProductList', data);
}

$(() => {
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
