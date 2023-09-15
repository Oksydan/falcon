import prestashop from 'prestashop';

/**
 * Toggle order confirmation button state
 * @param active {boolean} - false if button should be disabled
 */
const toggleOrderConfirmationButtonState = (active = false) => {
  const { confirmationSelector } = prestashop.selectors.checkout;

  document.querySelectorAll(`${confirmationSelector} button`).forEach((element) => {
    element.classList.toggle('disabled', !active);
  });
};

export default toggleOrderConfirmationButtonState;
