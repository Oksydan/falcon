import prestashop from 'prestashop';
import getSelectedPaymentOption from '../../utils/getSelectedPaymentOption';
import canProceedOrder from '../../utils/canProceedOrder';
import checkCartStillOrderableRequest from '../../request/checkCartStillOrderableRequest';
import toggleOrderConfirmationButtonState from '../../utils/toggleOrderConfirmationButtonState';
import { each } from '../../../../../utils/DOM/DOMHelpers';

const showNativeFormErrors = () => {
  const { termsCheckboxSelector } = prestashop.selectors.checkout;

  each(`input[name=payment-option], ${termsCheckboxSelector}`, (formElement) => {
    formElement.reportValidity();
  });
};

/**
 * Handles the click event to confirm the order in the Prestashop checkout process.
 *
 * @async
 * @function
 * @param {object} e - The click event.
 * @returns {Promise<void>}
 */
const confirmOrderHandler = async (e) => {
  e.preventDefault();

  const selectedPaymentOption = getSelectedPaymentOption();
  const selectedPaymentOptionId = selectedPaymentOption?.id;

  if (!canProceedOrder()) {
    showNativeFormErrors();
    return;
  }

  // We ask cart controller, if everything in the cart is still orderable
  const { getRequest } = checkCartStillOrderableRequest();

  const resp = await getRequest();

  // We process the information and allow other modules to intercept this
  const isRedirected = prestashop.checkout.onCheckOrderableCartResponse(resp);

  // If there is a redirect, we deny the form submit below, to allow the redirect to complete
  if (isRedirected) {
    return;
  }

  toggleOrderConfirmationButtonState(false);
  document.querySelector(`#pay-with-${selectedPaymentOptionId}-form form`)?.submit();
};

export default confirmOrderHandler;
