/**
 * Represents the state of the cart.
 * @typedef {Object} state
 * @property {string} errorMsg - The error message related to the cart state.
 * @property {boolean} isUpdateOperation - Indicates whether the cart is in an update operation.
 * @property {boolean} hasError - Indicates whether an error has occurred in the cart.
 */
const state = {
  errorMsg: '',
  isUpdateOperation: false,
  hasError: false,
};

/**
 * Store for managing the state of the cart.
 * @module
 * @returns {object} Object with methods to interact with the cart state.
 */
const cartStateStore = () => {
  /**
   * Sets the error message in the cart state.
   * @method setErrorMsg
   * @public
   * @param {string} value - The error message to set.
   * @returns {void}
   */
  const setErrorMsg = (value) => {
    state.errorMsg = value;
  };

  /**
   * Gets the current error message from the cart state.
   * @method getErrorMsg
   * @public
   * @returns {string} The current error message.
   */
  const getErrorMsg = () => state.errorMsg;

  /**
   * Sets the isUpdateOperation value in the cart state.
   * @method setIsUpdateOperation
   * @public
   * @param {boolean} value - The value to set for isUpdateOperation.
   * @returns {void}
   */
  const setIsUpdateOperation = (value) => {
    state.isUpdateOperation = value;
  };

  /**
   * Gets the current value of isUpdateOperation from the cart state.
   * @method getIsUpdateOperation
   * @public
   * @returns {boolean} The current value of isUpdateOperation.
   */
  const getIsUpdateOperation = () => state.isUpdateOperation;

  /**
   * Sets the hasError value in the cart state.
   * @method setHasError
   * @public
   * @param {boolean} value - The value to set for hasError.
   * @returns {void}
   */
  const setHasError = (value) => {
    state.hasError = value;
  };

  /**
   * Gets the current value of hasError from the cart state.
   * @method getHasError
   * @public
   * @returns {boolean} The current value of hasError.
   */
  const getHasError = () => state.hasError;

  return {
    setErrorMsg,
    getErrorMsg,
    setIsUpdateOperation,
    getIsUpdateOperation,
    setHasError,
    getHasError,
  };
};

export default cartStateStore;
