import prestashop from 'prestashop';
import { isElementVisible } from '@js/theme/utils/DOMHelpers';
import useToggleDisplay from '@js/theme/components/display/useToggleDisplay';
import switchEditAddressButtonColor from '@js/theme/core/checkout/utils/switchEditAddressButtonColor';
import switchConfirmAddressesButtonState from '@js/theme/core/checkout/utils/switchConfirmAddressesButtonState';
import getEditAddress from '@js/theme/core/checkout/utils/getEditAddress';

const changeAddressHandler = (e) => {
  const {
    addressItem,
    addressItemChecked,
    addressError,
    notValidAddresses,
  } = prestashop.selectors.checkout;

  document.querySelectorAll(addressItem).forEach((element) => {
    element.classList.remove('selected');
  });
  document.querySelectorAll(addressItemChecked).forEach((element) => {
    element.classList.add('selected');
  });

  const eventTarget = e.currentTarget;
  const addressErrorElement = document.querySelector(addressError);
  const idFailureAddress = addressErrorElement ? addressErrorElement?.id.split('-').pop() : null;
  const notValidAddressesVal = document.querySelector(notValidAddresses)?.value;
  const addressType = eventTarget.getAttribute('name')?.split('_').pop();
  const addressErrorElements = document.querySelectorAll(`${addressError}[name=alert-${addressType}]`);
  const { show, hide } = useToggleDisplay();

  switchEditAddressButtonColor(false, idFailureAddress, addressType);

  if (notValidAddressesVal !== '' && getEditAddress() === null && notValidAddressesVal.split(',').indexOf(eventTarget.value) >= 0) {
    addressErrorElements.forEach(show);
    switchEditAddressButtonColor(true, eventTarget.value, addressType);

    if (addressErrorElement) {
      addressErrorElement.id = `id-failure-address-${eventTarget.value}`;
    }
  } else {
    addressErrorElements.forEach(hide);
  }

  const allAddressErrors = document.querySelectorAll(addressError);
  const visibleAddressError = Array.from(allAddressErrors).filter(isElementVisible);

  switchConfirmAddressesButtonState(visibleAddressError.length <= 0);
};

export default changeAddressHandler;
