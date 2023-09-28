import prestashop from 'prestashop';
import { each } from '../../../utils/DOMHelpers';
import useToggleDisplay from '../../../components/display/useToggleDisplay';

/**
 * Collapse all payment options additional information blocks and options form
 */
const collapseAllPaymentOptions = () => {
  const { additionalInformatonSelector, optionsForm } = prestashop.selectors.checkout;
  const paymentRelatedBlocks = document.querySelectorAll(`${additionalInformatonSelector}, ${optionsForm}`);
  const { hide } = useToggleDisplay();

  each(paymentRelatedBlocks, hide);
};

export default collapseAllPaymentOptions;
