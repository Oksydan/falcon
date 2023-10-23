import prestashop from 'prestashop';
import { DOMReady } from '../../../utils/DOM/DOMHelpers';

import checkoutController from './checkoutController';

prestashop.checkout = prestashop.checkout || {};

/**
 * Event handler for checking orderable cart response.
 *
 * @param {object} resp - Response object.
 * @param {object} paymentObject - Payment object.
 * @returns {boolean} Returns true if there are errors; otherwise, returns false.
 */
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

/**
 * Initializes the checkout process if the page is the checkout page.
 *
 * @returns {void}
 */
const initCheckout = () => {
  if (prestashop.page.page_name !== 'checkout') {
    return;
  }

  const { init } = checkoutController();

  init();
};

// Event listener for DOM ready event.
DOMReady(() => {
  // Initialize the checkout process when the DOM is ready.
  initCheckout();
});
