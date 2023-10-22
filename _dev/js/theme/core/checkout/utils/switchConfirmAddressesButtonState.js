/**
 * Switches the state of the confirm addresses button.
 *
 * @function
 * @param {boolean} enable - `false` if the button should be disabled.
 * @returns {void}
 */
const switchConfirmAddressesButtonState = (enable) => {
  each('button[name=confirm-addresses]', (button) => {
    button.disabled = !enable;
  });
};

export default switchConfirmAddressesButtonState;
