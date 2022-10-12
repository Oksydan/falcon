import prestashop from 'prestashop';
import $ from 'jquery';

prestashop.themeSelectors = {
  product: {
    tabs: '.tabs .nav-link',
    activeNavClass: 'js-product-nav-active',
    activeTabClass: 'js-product-tab-active',
    activeTabs: '.tabs .nav-link.active, .js-product-nav-active',
    imagesModal: '.js-product-images-modal',
    thumb: '.js-thumb',
    thumbContainer: '.thumb-container, .js-thumb-container',
    arrows: '.js-arrows',
    selected: '.selected, .js-thumb-selected',
    modalProductCover: '.js-modal-product-cover',
    cover: '.js-qv-product-cover',
  },
  listing: {
    searchFilterToggler: '#search_filter_toggler, .js-search-toggler',
    searchFiltersWrapper: '#search_filters_wrapper',
    searchFilterControls: '#search_filter_controls',
    searchFilters: '#search_filters',
    activeSearchFilters: '#js-active-search-filters',
    listTop: '#js-product-list-top',
    list: '#js-product-list',
    listBottom: '#js-product-list-bottom',
    listHeader: '#js-product-list-header',
    searchFiltersClearAll: '.js-search-filters-clear-all',
    searchLink: '.js-search-link',
  },
  order: {
    returnForm: '#order-return-form, .js-order-return-form',
  },
  arrowDown: '.arrow-down, .js-arrow-down',
  arrowUp: '.arrow-up, .js-arrow-up',
  clear: '.clear',
  fileInput: '.js-file-input',
  contentWrapper: '#content-wrapper, .js-content-wrapper',
  footer: '#footer, .js-footer',
  modalContent: '.js-modal-content',
  modal: '.js-checkout-modal',
  touchspin: '.js-touchspin',
  checkout: {
    termsLink: '.js-terms a',
    giftCheckbox: '.js-gift-checkbox',
    imagesLink: '.card-block .cart-summary-products p a, .js-show-details',
    carrierExtraContent: '.carrier-extra-content, .js-carrier-extra-content',
  },
};

$(() => {
  prestashop.emit('themeSelectorsInit');
});
