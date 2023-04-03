import $ from 'jquery';
import ProductGallery from '@js/product/components/ProductGallery';

function activateFirstProductTab() {
  $('.product-tabs .nav .nav-item:first-child a').tab('show');
}

function handleProductDetailsToggle() {
  const $link = $('[href="#product-details"]');
  const $tab = $($link.attr('href'));

  if ($tab.length && $link.length && $link.hasClass('active')) {
    $tab.addClass('show active');
  }
}

$(() => {
  activateFirstProductTab();
  const gallery = new ProductGallery();

  gallery.init();

  prestashop.on('updatedProductCombination', ({ product_add_to_cart }) => {
    gallery.init();

    if (product_add_to_cart) {
      const node = document.createElement('div');
      node.innerHTML = product_add_to_cart;

      const html = node.querySelector('.js-product-actions-buttons');

      if (html) {
        const productActionsElement = document.querySelector('.js-product-actions-buttons');

        productActionsElement.replaceWith(html);
      }
    }
  });

  prestashop.on('updatedProduct', () => {
    handleProductDetailsToggle();
  });
});
