import $ from 'jquery';

$(() => {
  activateFirstProductTab();
});

function activateFirstProductTab() {
  $('.product-tabs .nav .nav-item:first-child a').tab('show');

  prestashop.on('updateCart', (event) => {
    if (prestashop.page.page_name == 'product' && event.reason.idProduct == $('#add-to-cart-or-refresh').find('[name="id_product"]').val()) {
      prestashop.emit('updateProduct', {
        event,
        resp: {},
        reason: {
          productUrl: prestashop.urls.pages.product || '',
        },
      });
    }
  });
}
