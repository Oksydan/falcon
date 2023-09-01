import DOMReady from '@js/theme/utils/DOMReady';
import useCheckoutStepsController from '@js/theme/core/checkout/useCheckoutStepsController';
import prestashop from 'prestashop';
import checkoutPayment from '@js/theme/core/checkout/checkoutPayment';
import checkoutDelivery from '@js/theme/core/checkout/checkoutDelivery';

prestashop.checkout = prestashop.checkout || {};

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

const { handleStepClick } = useCheckoutStepsController();

const handleCheckoutStepChange = () => {
  const editStepElements = document.querySelectorAll(prestashop.selectors.checkout.stepEdit);

  if (!editStepElements) {
    return;
  }

  editStepElements.forEach((editStepElement) => {
    editStepElement.addEventListener('click', (event) => {
      event.preventDefault();
      handleStepClick(event);

      prestashop.emit('changedCheckoutStep', { event });
    });
  });
};

const handleSubmitButton = () => {
  const checkoutForms = document.querySelectorAll(prestashop.selectors.checkout.form);

  checkoutForms.forEach((checkoutForm) => {
    checkoutForm.addEventListener('submit', (event) => {
      const submitButtons = event.target.querySelectorAll('button[type="submit"]');

      event.target.dataset.disabled = true;

      if (submitButtons) {
        submitButtons.forEach((submitButton) => {
          submitButton.classList.add('disabled');
        });
      }

      prestashop.emit('submitCheckoutForm', { event });
    });
  });
}

const initCheckout = () => {
  if (document.querySelector('body#checkout') === null) {
    return;
  }

  handleSubmitButton();
  handleCheckoutStepChange();
  checkoutPayment();
  checkoutDelivery();
};

DOMReady(() => {
  initCheckout();
});
