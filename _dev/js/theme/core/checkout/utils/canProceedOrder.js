import areConditionsAccepted from './areConditionsAccepted';
import getSelectedPaymentOption from './getSelectedPaymentOption';

/**
 * Check if order can be proceeded
 * @returns {boolean} true if order can be proceeded or false otherwise
 */
const canProceedOrder = () => {
  let proceed = areConditionsAccepted();

  if (!getSelectedPaymentOption()) {
    proceed = false;
  }

  return proceed;
};

export default canProceedOrder;
