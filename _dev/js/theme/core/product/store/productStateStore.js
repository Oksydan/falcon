/**
 * Represents the state of the product.
 *
 * @typedef {object} ProductState
 * @property {boolean} isOnPopStateEvent - Indicates if the current event is a popstate event.
 * @property {boolean} formChanged - Indicates if the form has changed.
 * @property {null|number} currentRequestDelayedId - The current request delayed id.
 */

/**
 * The state of the product.
 *
 * @type {ProductState}
 */
const state = {
  isOnPopStateEvent: false,
  formChanged: false,
  currentRequestDelayedId: null,
};

/**
 * Store for managing the state of the product.
 *
 * @module
 * @returns {Object} - Object containing methods to interact with the product state.
 */
const productStateStore = () => {
  /**
   * Returns true if the current event is a popstate event.
   *
   * @function
   * @returns {boolean} - True if the current event is a popstate event.
   */
  const isOnPopState = () => state.isOnPopStateEvent;

  /**
   * Sets the current event as a popstate event.
   *
   * @function
   * @param {boolean} value - The value to set for the popstate event.
   * @returns {void}
   */
  const setOnPopState = (value) => {
    state.isOnPopStateEvent = value;
  };

  /**
   * Sets the form changed state.
   *
   * @function
   * @param {boolean} value - The value to set for the form changed state.
   * @returns {void}
   */
  const setFormChanged = (value) => {
    state.formChanged = value;
  };

  /**
   * Returns true if the form has changed.
   *
   * @function
   * @returns {boolean} - True if the form has changed.
   */
  const isFormChanged = () => state.formChanged;

  /**
   * Returns the current request delayed id.
   *
   * @function
   * @returns {null|number} - The current request delayed id.
   */
  const getCurrentRequestDelayedId = () => state.currentRequestDelayedId;

  /**
   * Sets the current request delayed id.
   *
   * @function
   * @param {null|number} value - The value to set for the current request delayed id.
   * @returns {void}
   */
  const setCurrentRequestDelayedId = (value) => {
    state.currentRequestDelayedId = value;
  };

  return {
    isOnPopState,
    setOnPopState,
    setFormChanged,
    isFormChanged,
    getCurrentRequestDelayedId,
    setCurrentRequestDelayedId,
  };
};

export default productStateStore;
