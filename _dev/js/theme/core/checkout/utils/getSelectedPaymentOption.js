/**
 * Get selected payment option
 * @returns {HTMLElement|null} Selected payment option HTMLElement or null if not found
 */
const getSelectedPaymentOption = () => document.querySelector('input[name="payment-option"]:checked');

export default getSelectedPaymentOption;
