import { each } from '../../../utils/DOMHelpers';

/**
 * Switch confirm addresses button state
 * @param enable {boolean} - false if button should be disabled
 */
const switchConfirmAddressesButtonState = (enable) => {
  each('button[name=confirm-addresses]', (button) => {
    button.disabled = !enable;
  });
};

export default switchConfirmAddressesButtonState;
