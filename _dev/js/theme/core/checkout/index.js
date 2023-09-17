import prestashop from 'prestashop';
import DOMReady from '../../utils/DOMReady';

import checkoutController from './checkoutController';

prestashop.checkout = prestashop.checkout || {};

// GLOBAL
prestashop.checkout.onCheckOrderableCartResponse = (resp, paymentObject) => {
  if (resp.errors === true) {
    prestashop.emit('orderConfirmationErrors', {
      resp,
      paymentObject,
    });

    return true;
  }

  return false;
};

const initCheckout = () => {
  if (prestashop.page.page_name !== 'checkout') {
    return;
  }

  const { init } = checkoutController();

  init();
};

DOMReady(() => {
  initCheckout();
});
