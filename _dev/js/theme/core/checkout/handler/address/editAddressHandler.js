import prestashop from 'prestashop';

/**
 * Edit address handler
 * @param event {object} - click event
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
