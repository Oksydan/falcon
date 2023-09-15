import prestashop from 'prestashop';
import getSelectedPaymentOption from '../../utils/getSelectedPaymentOption';
import canProceedOrder from '../../utils/canProceedOrder';
import checkCartStillOrderableRequest from '../../request/checkCartStillOrderableRequest';
import toggleOrderConfirmationButtonState from '../../utils/toggleOrderConfirmationButtonState';
import { each } from '../../../../utils/DOMHelpers';

const showNativeFormErrors = () => {
  const { termsCheckboxSelector } = prestashop.selectors.checkout;

  each(`input[name=payment-option], ${termsCheckboxSelector}`, (formElement) => {
    formElement.reportValidity();
  });
};

const confirmOrderHandler = async (e) => {
  e.preventDefault();

  const selectedPaymentOption = getSelectedPaymentOption();
  const selectedPaymentOptionId = selectedPaymentOption?.id;

  if (!canProceedOrder()) {
    showNativeFormErrors();
    return;
  }

  // We ask cart controller, if everything in the cart is still orderable
  const { getRequest } = checkCartStillOrderableRequest(window.prestashop.urls.pages.order);

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
