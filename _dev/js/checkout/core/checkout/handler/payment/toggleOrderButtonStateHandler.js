import prestashop from 'prestashop';
import useToggleDisplay from '../../../../../utils/display/useToggleDisplay';
import canProceedOrder from '../../utils/canProceedOrder';
import toggleOrderConfirmationButtonState from '../../utils/toggleOrderConfirmationButtonState';
import { each } from '../../../../../utils/DOM/DOMHelpers';

const { toggle } = useToggleDisplay();

/**
 * Handles toggling the order button state based on the conditions and emits an event with the updated terms status.
 *
 * @function
 * @returns {void}
 */
const toggleOrderButtonStateHandler = () => {
  const { conditionAlertSelector } = prestashop.selectors.checkout;

  const paymentBtnEnabled = canProceedOrder();

  prestashop.emit('termsUpdated', {
    isChecked: paymentBtnEnabled,
  });

  toggleOrderConfirmationButtonState(paymentBtnEnabled);

  each(conditionAlertSelector, (element) => {
    toggle(element, !paymentBtnEnabled);
  });
};

export default toggleOrderButtonStateHandler;
