import $ from 'jquery';
import ProductGallery from '@js/product/components/ProductGallery';

function activateFirstProductTab() {
  $('.product-tabs .nav .nav-item:first-child a').tab('show');
}

$(() => {
  activateFirstProductTab();
  const gallery = new ProductGallery();

  gallery.init();

  prestashop.on('updatedProductCombination', () => {
    gallery.init();
  });
});
