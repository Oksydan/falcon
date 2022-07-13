import $ from 'jquery';
import ProductGallery from './components/ProductGallery';

$(() => {
  activateFirstProductTab();
  const gallery = new ProductGallery();

  gallery.init();

  prestashop.on('updatedProductCombination', () => {
    gallery.init();
  })
});

function activateFirstProductTab() {
  $('.product-tabs .nav .nav-item:first-child a').tab('show');
}
