import DOMReady from '@js/theme/utils/DOMReady';
import useCheckoutStepsController from '@js/theme/core/checkout/useCheckoutStepsController';
import prestashop from 'prestashop';

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

const initCheckout = () => {
  if (document.querySelector('body#checkout') === null) {
    return;
  }

  handleCheckoutStepChange();
};

DOMReady(() => {
  initCheckout();
});
