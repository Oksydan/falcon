import prestashop from 'prestashop';
import { each } from '../../../utils/DOMHelpers';
import useToggleDisplay from '../../../components/display/useToggleDisplay';

/**
 * Collapses all payment options' additional information blocks and options forms.
 *
 * @function
 * @returns {void}
 */
const collapseAllPaymentOptions = () => {
  /**
   * The selectors related to payment options.
   * @type {object}
   * @property {string} additionalInformatonSelector - Selector for additional information blocks.
   * @property {string} optionsForm - Selector for options forms.
   */
  const { additionalInformatonSelector, optionsForm } = prestashop.selectors.checkout;

  /**
   * All payment-related blocks to be collapsed.
   * @type {NodeListOf<Element>}
   */
  const paymentRelatedBlocks = document.querySelectorAll(`${additionalInformatonSelector}, ${optionsForm}`);

  /**
   * The toggle display utility.
   * @type {object}
   * @property {function} hide - Function to hide an element.
   */
  const { hide } = useToggleDisplay();

  each(paymentRelatedBlocks, hide);
};

export default collapseAllPaymentOptions;
