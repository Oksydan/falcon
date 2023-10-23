import prestashop from 'prestashop';
import { each } from '../../../../../utils/DOM/DOMHelpers';

/**
 * Handles the submission of the checkout form, disables submit buttons, and emits a 'submitCheckoutForm' event.
 *
 * @function
 * @param {object} event - The submit event object.
 * @returns {void}
 */
const checkoutFormSubmitHandler = (event) => {
  const submitButtons = event.target.querySelectorAll('button[type="submit"]');

  event.target.dataset.disabled = true;

  each(submitButtons, (submitButton) => {
    submitButton.classList.add('disabled');
  });

  prestashop.emit('submitCheckoutForm', { event });
};

export default checkoutFormSubmitHandler;
