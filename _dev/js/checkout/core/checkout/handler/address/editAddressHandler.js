import prestashop from 'prestashop';

/**
 * Handles the click event for editing an address in the Prestashop checkout process.
 *
 * @function
 * @param {object} event - The click event object.
 */
const editAddressHandler = (event) => {
  const {
    addressesStep,
    stepEdit,
  } = prestashop.selectors.checkout;

  event.stopPropagation();
  document.querySelector(`${addressesStep} ${stepEdit}`)?.click();
  prestashop.emit('editAddress');
};

export default editAddressHandler;
