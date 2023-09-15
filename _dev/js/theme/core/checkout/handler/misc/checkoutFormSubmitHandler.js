import prestashop from 'prestashop';
import { each } from '../../../../utils/DOMHelpers';

const checkoutFormSubmitHandler = (event) => {
  const submitButtons = event.target.querySelectorAll('button[type="submit"]');

  event.target.dataset.disabled = true;

  each(submitButtons, (submitButton) => {
    submitButton.classList.add('disabled');
  });

  prestashop.emit('submitCheckoutForm', { event });
};

export default checkoutFormSubmitHandler;
