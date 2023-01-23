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

  prestashop.on('updatedProductCombination', () => {
    gallery.init();
  });

  prestashop.on('updatedProduct', () => {
    handleProductDetailsToggle();
  });
});
