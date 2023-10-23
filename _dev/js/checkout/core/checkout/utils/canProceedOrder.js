import areConditionsAccepted from './areConditionsAccepted';
import getSelectedPaymentOption from './getSelectedPaymentOption';

/**
 * Checks if the order can be proceeded.
 *
 * @function
 * @returns {boolean} True if the order can be proceeded, or false otherwise.
 */
const canProceedOrder = () => {
  /**
   * The flag indicating whether the conditions are accepted.
   * @type {boolean}
   */
  let proceed = areConditionsAccepted();

  /**
   * The selected payment option.
   * @type {HTMLElement | null}
   */
  const selectedPaymentOption = getSelectedPaymentOption();

  /**
   * Checks if a payment option is selected.
   */
  if (!selectedPaymentOption) {
    proceed = false;
  }

  return proceed;
};

export default canProceedOrder;
