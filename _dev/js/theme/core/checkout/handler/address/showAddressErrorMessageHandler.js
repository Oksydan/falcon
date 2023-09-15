import prestashop from 'prestashop';
import useToggleDisplay from '../../../../components/display/useToggleDisplay';
import switchConfirmAddressesButtonState from '../../utils/switchConfirmAddressesButtonState';
import switchEditAddressButtonColor from '../../utils/switchEditAddressButtonColor';
import { isElementVisible } from '../../../../utils/DOMHelpers';
import getEditAddress from '../../utils/getEditAddress';

const showAddressErrorMessageHandler = () => {
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

export default showAddressErrorMessageHandler;
