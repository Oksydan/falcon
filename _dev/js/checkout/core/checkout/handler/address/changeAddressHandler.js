import prestashop from 'prestashop';
import useToggleDisplay from '../../../../../utils/display/useToggleDisplay';
import switchEditAddressButtonColor from '../../utils/switchEditAddressButtonColor';
import getEditAddress from '../../utils/getEditAddress';
import switchConfirmAddressesButtonState from '../../utils/switchConfirmAddressesButtonState';
import { isElementVisible, each } from '../../../../../utils/DOM/DOMHelpers';

/**
 * Handles the change event for address selection in the Prestashop checkout process.
 *
 * @function
 * @param {object} event - The change event object.
 */
const changeAddressHandler = (event) => {
  const {
    addressItem,
    addressItemChecked,
    addressError,
    notValidAddresses,
  } = prestashop.selectors.checkout;

  each(addressItem, (element) => {
    element.classList.remove('selected');
  });
  each(addressItemChecked, (element) => {
    element.classList.add('selected');
  });

  const eventTarget = event.delegateTarget;
  const addressErrorElement = document.querySelector(addressError);
  const idFailureAddress = addressErrorElement ? addressErrorElement?.id.split('-').pop() : null;
  const notValidAddressesVal = document.querySelector(notValidAddresses)?.value;
  const addressType = eventTarget.getAttribute('name')?.split('_').pop();
  const addressErrorElements = document.querySelectorAll(`${addressError}[name=alert-${addressType}]`);
  const { show, hide } = useToggleDisplay();

  switchEditAddressButtonColor(false, idFailureAddress, addressType);

  if (notValidAddressesVal !== '' && getEditAddress() === null && notValidAddressesVal.split(',').indexOf(eventTarget.value) >= 0) {
    each(addressErrorElements, show);
    switchEditAddressButtonColor(true, eventTarget.value, addressType);

    if (addressErrorElement) {
      addressErrorElement.id = `id-failure-address-${eventTarget.value}`;
    }
  } else {
    each(addressErrorElements, hide);
  }

  const allAddressErrors = document.querySelectorAll(addressError);
  const visibleAddressError = Array.from(allAddressErrors).filter(isElementVisible);

  switchConfirmAddressesButtonState(visibleAddressError.length <= 0);
};

export default changeAddressHandler;
