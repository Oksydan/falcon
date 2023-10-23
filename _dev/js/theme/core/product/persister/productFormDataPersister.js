import { formSerializeArray } from '../../../../utils/formSerialize';

let formData = [];

/**
 * Persists product form data.
 * @module
 * @returns {object} - Object with methods for persisting and retrieving form data.
 */
const productFormDataPersister = () => {
  /**
   * Persists form data from the form element.
   *
   * @method
   * @param {HTMLFormElement} formElement - Form element to persist.
   * @throws {Error} - If formElement is not a form element.
   * @return {void}
   */
  const persist = (formElement) => {
    if (formElement?.tagName !== 'FORM') {
      throw new Error('formElement is not a form element');
    }

    formData = formSerializeArray(formElement);
  };

  /**
   * Returns persisted data.
   *
   * @method
   * @return {Array} - Persisted form data.
   */
  const get = () => formData;

  return {
    persist,
    get,
  };
};

export default productFormDataPersister;
