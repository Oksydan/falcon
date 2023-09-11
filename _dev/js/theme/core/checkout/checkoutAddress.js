import prestashop from 'prestashop';
import useToggleDisplay from '@js/theme/components/display/useToggleDisplay';
import switchEditAddressButtonColor from '@js/theme/core/checkout/utils/switchEditAddressButtonColor';
import switchConfirmAddressesButtonState from '@js/theme/core/checkout/utils/switchConfirmAddressesButtonState';
import getEditAddress from '@js/theme/core/checkout/utils/getEditAddress';
import { isElementVisible } from '@js/theme/utils/DOMHelpers';

const handleOnLoad = () => {
  const { addressForm, addressError } = prestashop.selectors.checkout;
  const getAllAddressErrors = () => document.querySelectorAll(addressError);
  const getVisibleAddressErrors = () => Array.from(getAllAddressErrors()).filter(isElementVisible);
  const visibleAddressErrors = getVisibleAddressErrors();
  const { hide } = useToggleDisplay();

  if (
    getEditAddress() !== null
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

const checkoutAddress = () => {
  handleOnLoad();
};

export default checkoutAddress;
