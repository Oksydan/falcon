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

  prestashop.on('updatedProductCombination', (event) => {
    gallery.init();

    const { product_add_to_cart: productAddToCart } = event;

    if (productAddToCart) {
      const node = document.createElement('div');
      node.innerHTML = productAddToCart;

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
