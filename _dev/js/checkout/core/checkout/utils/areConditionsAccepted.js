import prestashop from 'prestashop';
import { each } from '../../../../utils/DOM/DOMHelpers';

/**
 * Checks if all conditions are accepted.
 *
 * @function
 * @returns {boolean} True if all conditions are accepted, or false otherwise.
 */
const areConditionsAccepted = () => {
  /**
   * The flag indicating whether all conditions are accepted.
   * @type {boolean}
   */
  let accepted = true;

  /**
   * The selector for conditions.
   * @type {string}
   */
  const { conditionsSelector } = prestashop.selectors.checkout;

  /**
   * The list of conditions.
   * @type {NodeList<HTMLInputElement>}
   */
  const conditions = document.querySelectorAll(`${conditionsSelector} input[type="checkbox"]`);

  /**
   * Iterates through each condition and checks if it is accepted.
   *
   * @callback eachCallback
   * @param {HTMLInputElement} condition - The current condition.
   * @returns {void}
   */

  /**
   * The helper function for iterating through each condition.
   * @type {eachCallback}
   */
  each(conditions, (condition) => {
    if (!condition.checked) {
      accepted = false;
    }
  });

  return accepted;
};

export default areConditionsAccepted;
