import $ from 'jquery';
import prestashop from 'prestashop';
import useToggleDisplay from '@js/theme/components/display/useToggleDisplay';
import { isElementVisible } from '@js/theme/utils/DOMHelpers';

/**
 * Check if browser url contains editAddress parameter
 * @returns {string | null}
 */
const getEditAddress = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.has('editAddress') ? urlParams.get('editAddress') : null;
};

/**
 * Change the color of the edit button for the wrong address
 * @param {Boolean} enabled
 * @param {Number} id
 * @param {String} type
 */
const switchEditAddressButtonColor = (
  enabled,
  id,
  type,
) => {
  const addressBtn = $(`#id_address_${type}-address-${id} .js-edit-address`);
  const classesToToggle = ['text-danger'];

  document.querySelectorAll(`#${type}-addresses .js-edit-address`).forEach((button) => {
    button.classList.remove(...classesToToggle);
  });

  $(`#${type}-addresses .js-edit-address`).removeClass(classesToToggle);

  if (enabled) {
    addressBtn.classList.add(...classesToToggle);
  } else {
    addressBtn.classList.remove(...classesToToggle);
  }
};

/**
 * Enable/disable the continue address button
 */
const switchConfirmAddressesButtonState = (enable) => {
  document.querySelectorAll('button[name=confirm-addresses]').forEach((button) => {
    button.disabled = !enable;
  });
};

const editAddress = getEditAddress();

const handleOnLoad = () => {
  const { addressForm, addressError, invoiceAddresses } = prestashop.selectors.checkout;
  const getAllAddressErrors = () => document.querySelectorAll(addressError);
  const getVisibleAddressErrors = () => Array.from(getAllAddressErrors()).filter(isElementVisible);
  const visibleAddressErrors = getVisibleAddressErrors();
  const { hide } = useToggleDisplay();

  if (
    editAddress !== null
        || Array.from(document.querySelectorAll(addressForm))
          .filter(isElementVisible).length > 1
  ) {
    getAllAddressErrors().forEach(hide);
  }

  visibleAddressErrors.forEach((element) => {
    const idFailureAddress = element?.id.split('-').pop();
    const addressType = element.getAttribute('name')?.split('-').pop();

    if (idFailureAddress && addressType) {
      switchEditAddressButtonColor(
        true,
        idFailureAddress,
        addressType,
      );
    }
  });

  switchConfirmAddressesButtonState(getVisibleAddressErrors().length <= 0);
};

const handleEditAddress = (event) => {
  const {
    addressesStep,
    stepEdit,
  } = prestashop.selectors.checkout;

  event.stopPropagation();
  document.querySelector(`${addressesStep} ${stepEdit}`)?.click();
  prestashop.emit('editAddress');
};

const handleAddressChange = (e) => {
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

  if (notValidAddressesVal !== '' && editAddress === null && notValidAddressesVal.split(',').indexOf(eventTarget.value) >= 0) {
    addressErrorElements.forEach(show);
    switchEditAddressButtonColor(true, eventTarget.value, addressType);
    addressErrorElement && (addressErrorElement.id = `id-failure-address-${eventTarget.value}`);
  } else {
    addressErrorElements.forEach(hide);
  }

  const allAddressErrors = document.querySelectorAll(addressError);
  const visibleAddressError = Array.from(allAddressErrors).filter(isElementVisible);

  switchConfirmAddressesButtonState(visibleAddressError.length <= 0);
};

const checkoutAddress = () => {
  const {
    editAddresses,
    deliveryAddressRadios,
  } = prestashop.selectors.checkout;

  // REMOVE EVENT FROM JQUERY AND ADD EVENT HANDLER FORM BS5 - DELEGATION IS NEEDED
  $(editAddresses).on('change', handleEditAddress);

  // REMOVE EVENT FROM JQUERY AND ADD EVENT HANDLER FORM BS5 - DELEGATION IS NEEDED
  $(deliveryAddressRadios).on('change', handleAddressChange);

  handleOnLoad();
};

export default checkoutAddress;
