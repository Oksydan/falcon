import $ from 'jquery';
import prestashop from 'prestashop';
import Filters from './components/Filters';

$(() => {
  const filters = new Filters();

  $('body').on('click', '#search_filter_toggler', () => {
    $('#search_filters_wrapper').removeClass('hidden-sm-down');
    $('#content-wrapper').addClass('hidden-sm-down');
    $('#footer').addClass('hidden-sm-down');
  });
  $('#search_filter_controls .clear').on('click', () => {
    $('#search_filters_wrapper').addClass('hidden-sm-down');
    $('#content-wrapper').removeClass('hidden-sm-down');
    $('#footer').removeClass('hidden-sm-down');
  });
  $('#search_filter_controls .ok').on('click', () => {
    $('#search_filters_wrapper').addClass('hidden-sm-down');
    $('#content-wrapper').removeClass('hidden-sm-down');
    $('#footer').removeClass('hidden-sm-down');
  });


  prestashop.on('updateProductList', (data) => {
    updateProductListDOM(data);
    window.scrollTo(0, 0);
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

  prestashop.BSSelect.init();
  prestashop.emit('updatedProductList', data);
}
