/**
 * Toggles the order confirmation button state.
 *
 * @function
 * @param {boolean} active - `false` if the button should be disabled, `true` otherwise.
 * @returns {void}
 */
const toggleOrderConfirmationButtonState = (active = false) => {
  const { confirmationSelector } = prestashop.selectors.checkout;

  document.querySelectorAll(`${confirmationSelector} button`).forEach((element) => {
    element.classList.toggle('disabled', !active);
  });
};

export default toggleOrderConfirmationButtonState;
