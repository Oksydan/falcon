import { formSerializeArray } from '../../../utils/formSerialize';

let formData = [];

/**
 * Persists product form data
 * @module
 */
const productFormDataPersister = () => {
  /**
   * Persists form data from the form element
   * @method
   * @param {HTMLFormElement} formElement - form element to persist
   * @throws {Error} - if formElement is not a form element
   * @return {void}
   */
  const persist = (formElement) => {
    if (formElement?.tagName !== 'FORM') {
      throw new Error('formElement is not a form element');
    }

    formData = formSerializeArray(formElement);
  };

  /**
   * Returns persisted data
   * @method
   * @return {*[]}
   */
  const get = () => formData;

  return {
    persist,
    get,
  };
};

export default productFormDataPersister;
