import '@js/theme/core/selectors';

import '@js/theme/core/cart/index';
import '@js/theme/core/product/index';
import '@js/theme/core/listing/index';
import '@js/theme/core/address/index';
import '@js/theme/core/checkout/index';

import psShowHide from '@js/theme/core/display/psShowHide';
import emailIdn from '@js/theme/core/email/emailIdn';
import DOMReady from '@js/theme/utils/DOMReady';

DOMReady(() => {
  psShowHide();
  emailIdn('input[type="email"]');
});
