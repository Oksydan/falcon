import prestashop from 'prestashop';
import { parseToHtml } from '../../../../utils/DOM/DOMHelpers';
import updateAddressRequest from '../request/updateAddressRequest';

/**
 * Handles the change of the address country in the address form.
 *
 * @function
 * @returns {Promise<void>} A Promise that resolves after the address is updated.
 * @throws {Error} Throws an error if there is an issue with the HTTP request.
 */
const changeAddressCountryHandler = async () => {
  /**
   * DOM selectors for the address form.
   *
   * @typedef {Object} DOMSelectors
   * @property {string} addressFormWrapperSelector - Selector for the address form wrapper.
   * @property {string} countrySelectSelector - Selector for the country select input.
   */

  /**
   * Retrieves DOM elements related to the address form.
   *
   * @function
   * @returns {Object} Object containing DOM elements.
   */
  const getDOMAddressElements = () => {
    const DOMSelectors = {
      addressFormWrapperSelector: '.js-address-form',
      countrySelectSelector: '.js-country',
    };

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
