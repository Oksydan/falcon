import DOMReady from '@js/theme/utils/DOMReady';
import useCheckoutStepsController from '@js/theme/core/checkout/useCheckoutStepsController';
import prestashop from 'prestashop';
import $ from "jquery";

const { handleStepClick } = useCheckoutStepsController();

const handleCheckoutStepChange = () => {
  const editStepElements = document.querySelectorAll(prestashop.selectors.checkout.stepEdit);

  if (!editStepElements) {
    return;
  }

  editStepElements.forEach((editStepElement) => {
    editStepElement.addEventListener('click', (event) => {
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
};

DOMReady(() => {
  initCheckout();
});
