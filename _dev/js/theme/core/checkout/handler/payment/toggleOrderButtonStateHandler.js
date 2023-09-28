import prestashop from 'prestashop';
import useToggleDisplay from '../../../../components/display/useToggleDisplay';
import canProceedOrder from '../../utils/canProceedOrder';
import toggleOrderConfirmationButtonState from '../../utils/toggleOrderConfirmationButtonState';
import { each } from '../../../../utils/DOMHelpers';

const { toggle } = useToggleDisplay();

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
