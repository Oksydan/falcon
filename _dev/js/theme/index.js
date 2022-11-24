import $ from 'jquery';
import '@js/theme/vendors/bootstrap/bootstrap-imports';
import 'bootstrap-touchspin';
import 'jquery-hoverintent';
import '@js/theme/components/dynamic-bootstrap-components';

import '@js/theme/components/selectors';
import '@js/theme/components/sliders';
import '@js/theme/components/responsive';
import '@js/theme/components/customer';
import '@js/theme/components/quickview';
import '@js/theme/components/product';
import '@js/theme/components/cart/cart';
import '@js/theme/components/cart/block-cart';

import usePasswordPolicy from '@js/theme/components/usePasswordPolicy';
import prestashop from 'prestashop';
import EventEmitter from 'events';
import Form from '@js/theme/components/form';
import TopMenu from '@js/theme/components/TopMenu';

import PageLazyLoad from '@js/theme/components/Lazyload';
import PageLoader from '@js/theme/components/PageLoader';

/* eslint-disable */
// "inherit" EventEmitter
for (const i in EventEmitter.prototype) {
  prestashop[i] = EventEmitter.prototype[i];
}
/* eslint-enable */

prestashop.pageLazyLoad = new PageLazyLoad({
  selector: '.lazyload',
});

prestashop.pageLoader = new PageLoader();

function accLinksTriggerActive() {
  const url = window.location.pathname;
  $('.js-customer-links a').each((i, el) => {
    const $el = $(el);

    if ($el.attr('href').indexOf(url) !== -1) {
      $el.addClass('active');
    }
  });
}

$(() => {
  accLinksTriggerActive();
  Form.init();
  const topMenu = new TopMenu('#_desktop_top_menu .js-main-menu');
  usePasswordPolicy('.field-password-policy');

  topMenu.init();

  $('.js-select-link').on('change', ({ target }) => {
    window.location.href = $(target).val();
  });
});
