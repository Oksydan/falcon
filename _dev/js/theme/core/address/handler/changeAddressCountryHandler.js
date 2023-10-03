import prestashop from 'prestashop';
import parseToHtml from '../../../utils/parseToHtml';
import updateAddressRequest from '../request/updateAddressRequest';

/**
 * Change address country handler
 * @returns {Promise<void>}
 */
const changeAddressCountryHandler = async () => {
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
  const idCountry = Number.parseInt(countrySelect.value, 10);
  const idAddress = Number.parseInt(addressForm.dataset?.idAddress, 10);

  const payload = {
    id_address: idAddress,
    id_country: idCountry,
  };

  const { getRequest } = updateAddressRequest(url, payload);

  try {
    const data = await getRequest();

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
      input.value = typeof inputsValue[input.name] !== 'undefined' ? inputsValue[input.name] : '';
    });

    prestashop.emit('updatedAddressForm', {
      target: newAddressFormWrapper,
      data,
    });
  } catch (error) {
    prestashop.emit('httpRequestError', {
      eventType: 'updateAddressForm',
      error,
    });
  }
};

export default changeAddressCountryHandler;
