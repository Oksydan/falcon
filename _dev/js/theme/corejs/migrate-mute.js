import jQuery from 'jquery';

(function () {
  if (typeof jQuery.migrateMute === 'undefined') {
    jQuery.migrateMute = !window.prestashop.debug;
  }
}());
