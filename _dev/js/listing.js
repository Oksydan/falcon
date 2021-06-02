import $ from 'jquery';
import prestashop from 'prestashop';
import Filters from './components/filters/Filters';

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


function updateProductListDOM(data) {
  $('#search_filters').replaceWith(data.rendered_facets);
  $('#js-active-search-filters').replaceWith(data.rendered_active_filters);
  $('#js-product-list-top').replaceWith(data.rendered_products_top);
  $('#js-product-list').replaceWith(data.rendered_products);
  $('#js-product-list-bottom').replaceWith(data.rendered_products_bottom);
  if (data.rendered_products_header) {
    $('#js-product-list-header').replaceWith(data.rendered_products_header);
  }

  prestashop.customSelect.init();
  prestashop.emit('updatedProductList', data);
}
