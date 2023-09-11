/**
 * Enable/disable the continue address button
 */
const switchConfirmAddressesButtonState = (enable) => {
  document.querySelectorAll('button[name=confirm-addresses]').forEach((button) => {
    button.disabled = !enable;
  });
};

export default switchConfirmAddressesButtonState;
