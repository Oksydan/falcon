import prestashop from 'prestashop';
import parseToHtml from '@js/theme/utils/parseToHtml';
import useAlertToast from '@js/theme/components/useAlertToast';
import useEvent from '@js/theme/components/event/useEvent';

const { danger } = useAlertToast();
const { on } = useEvent();

const handleAddressChange = async () => {
  const DOMSelectors = {
    addressFormWrapperSelector: '.js-address-form',
    countrySelectSelector: '.js-country',
  };
  const getDOMAddressElements = () => {
    const { addressFormWrapperSelector, countrySelectSelector } = DOMSelectors;
    const addressFormWrapper = document.querySelector(addressFormWrapperSelector);

    return {
      addressFormWrapper,
      addressForm: addressFormWrapper.querySelector('form'),
      countrySelect: addressFormWrapper.querySelector(countrySelectSelector),
      formInputs: addressFormWrapper.querySelectorAll('input'),
    };
  };
  const {
    addressFormWrapper,
    addressForm,
    countrySelect,
    formInputs,
  } = getDOMAddressElements();
  const url = addressForm.dataset?.refreshUrl;
  const idCountry = countrySelect.value;
  const idAddress = addressForm.dataset?.idAddress;

  try {
    const data = await prestashop.frontAPI.updateAddress(url, idAddress, idCountry);

    const inputsValue = [];

    // Store fields values before updating form
    formInputs.forEach((input) => {
      inputsValue[input.name] = input.value;
    });

    addressFormWrapper.replaceWith(parseToHtml(data.address_form));

    const {
      addressFormWrapper: newAddressFormWrapper,
      formInputs: newFormInputs,
    } = getDOMAddressElements();

    // Restore fields values
    newFormInputs.forEach((input) => {
      input.value = inputsValue[input.name];
    });

    prestashop.emit('updatedAddressForm', {
      target: newAddressFormWrapper,
      data,
    });
  } catch (error) {
    prestashop.emit(
      'handleError',
      {
        eventType: 'updateAddressForm',
        resp: {},
      },
    );
    danger(prestashop.t.alert.genericHttpError);
  }
};

const countryAddressChange = () => {
  on(document, 'change', '.js-country', handleAddressChange);
};

export default countryAddressChange;
