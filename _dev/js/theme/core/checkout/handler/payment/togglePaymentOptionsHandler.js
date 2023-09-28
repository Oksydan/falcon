import collapseAllPaymentOptions from '../../utils/collapseAllPaymentOptions';
import getSelectedPaymentOption from '../../utils/getSelectedPaymentOption';
import useToggleDisplay from '../../../../components/display/useToggleDisplay';
import canProceedOrder from '../../utils/canProceedOrder';
import toggleOrderConfirmationButtonState from '../../utils/toggleOrderConfirmationButtonState';
import { each } from '../../../../utils/DOMHelpers';

const { show } = useToggleDisplay();

const togglePaymentOptionsHandler = () => {
  const paymentBtnEnabled = canProceedOrder();

  collapseAllPaymentOptions();

  const selectedPaymentOption = getSelectedPaymentOption();
  const selectedOptionID = selectedPaymentOption?.id;

  each(`#${selectedOptionID}-additional-information, #pay-with-${selectedOptionID}-form`, show);

  toggleOrderConfirmationButtonState(paymentBtnEnabled);
};

export default togglePaymentOptionsHandler;
