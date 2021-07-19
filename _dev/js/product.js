import $ from 'jquery';

$(() => {
  activateFirstProductTab();
});

function activateFirstProductTab() {
  $('.product-tabs .nav .nav-item:first-child a').tab('show');
}
