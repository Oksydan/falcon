import prestashop from 'prestashop';

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
