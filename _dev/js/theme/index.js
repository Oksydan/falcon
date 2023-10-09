import $ from 'jquery';

import EventEmitter from 'events';

import './core/index';

import './vendors/bootstrap/bootstrap-imports';
import './components/dynamic-bootstrap-components';
import bsCustomFileInput from 'bs-custom-file-input';
import './components/header/index';
import './components/customer/index';
import './components/sliders';
import './components/responsive';
import './components/quickview';
import './components/product';
import prestashop from 'prestashop';
/* eslint-enable */

/* eslint-disable */
// "inherit" EventEmitter
for (const i in EventEmitter.prototype) {
  prestashop[i] = EventEmitter.prototype[i];
}
import usePasswordPolicy from './components/password/usePasswordPolicy';
import useThemeForm from './components/useThemeForm';
import PageLazyLoad from './components/Lazyload';
import httpRequestErrorHandler from './handler/error/httpRequestErrorHandler';
import usePageLoader from "./components/usePageLoader";

prestashop.pageLazyLoad = new PageLazyLoad({
  selector: '.lazyload',
});

prestashop.pageLoader = usePageLoader();

prestashop.on('handleError', httpRequestErrorHandler);


$(() => {
  const { init: initForm } = useThemeForm();
  initForm();
  bsCustomFileInput.init();
  usePasswordPolicy('.field-password-policy');

  $('.js-select-link').on('change', ({ target }) => {
    window.location.href = $(target).val();
  });
});
