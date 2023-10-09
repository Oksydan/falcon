import $ from 'jquery';

import EventEmitter from 'events';

import '@js/theme/core';

import './vendors/bootstrap/bootstrap-imports';
import './components/dynamic-bootstrap-components';
import bsCustomFileInput from 'bs-custom-file-input';
import './components/sliders';
import './components/responsive';
import './components/customer';
import './components/quickview';
import './components/product';
import prestashop from 'prestashop';
import useTopMenu from './components/useTopMenu';
/* eslint-enable */

/* eslint-disable */
// "inherit" EventEmitter
for (const i in EventEmitter.prototype) {
  prestashop[i] = EventEmitter.prototype[i];
}
import usePasswordPolicy from './components/password/usePasswordPolicy';
import Form from './components/form';
import PageLazyLoad from './components/Lazyload';
import PageLoader from './components/PageLoader';
import useStickyElement from './components/useStickyElement';
import httpRequestErrorHandler from './handler/error/httpRequestErrorHandler';

prestashop.pageLazyLoad = new PageLazyLoad({
  selector: '.lazyload',
});

prestashop.pageLoader = new PageLoader();

prestashop.on('handleError', httpRequestErrorHandler);

function accLinksTriggerActive() {
  const url = window.location.pathname;
  $('.js-customer-links a').each((i, el) => {
    const $el = $(el);

    if ($el.attr('href').indexOf(url) !== -1) {
      $el.addClass('active');
    }
  });
}

function initStickyHeader() {
  const header = document.querySelector('.js-header-top');
  const headerWrapper = document.querySelector('.js-header-top-wrapper');

  if (header && headerWrapper) {
    useStickyElement(header, headerWrapper);
  }
}

$(() => {
  const { init: initTopMenu } = useTopMenu('.js-main-menu');

  initStickyHeader();
  accLinksTriggerActive();
  Form.init();
  bsCustomFileInput.init();
  usePasswordPolicy('.field-password-policy');
  initTopMenu();

  $('.js-select-link').on('change', ({ target }) => {
    window.location.href = $(target).val();
  });
});
