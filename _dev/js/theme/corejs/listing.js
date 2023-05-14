import $ from 'jquery';
import prestashop from 'prestashop';

$(() => {
  $('body').on('click', prestashop.selectors.listing.quickview, (event) => {
    prestashop.emit('clickQuickView', {
      dataset: $(event.target).closest(prestashop.selectors.product.miniature).data(),
    });
    event.preventDefault();
  });
});
