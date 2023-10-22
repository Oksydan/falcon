/**
 * Gets the selected payment option.
 *
 * @function
 * @returns {HTMLElement | null} The selected payment option HTMLElement, or null if not found.
 */
const getSelectedPaymentOption = () => document.querySelector('input[name="payment-option"]:checked');

export default getSelectedPaymentOption;
