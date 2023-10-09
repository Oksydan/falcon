import $ from 'jquery';

import EventEmitter from 'events';

import '@js/theme/core';

import '@js/theme/vendors/bootstrap/bootstrap-imports';
import '@js/theme/components/dynamic-bootstrap-components';
import bsCustomFileInput from 'bs-custom-file-input';
import '@js/theme/components/sliders';
import '@js/theme/components/responsive';
import '@js/theme/components/customer';
import '@js/theme/components/quickview';
import '@js/theme/components/product';
import useTopMenu from './components/useTopMenu';
/* eslint-enable */

import prestashop from 'prestashop';

/* eslint-disable */
// "inherit" EventEmitter
for (const i in EventEmitter.prototype) {
  prestashop[i] = EventEmitter.prototype[i];
}
import usePasswordPolicy from '@js/theme/components/password/usePasswordPolicy';
import Form from '@js/theme/components/form';
import PageLazyLoad from '@js/theme/components/Lazyload';
import PageLoader from '@js/theme/components/PageLoader';
import useStickyElement from '@js/theme/components/useStickyElement';
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
