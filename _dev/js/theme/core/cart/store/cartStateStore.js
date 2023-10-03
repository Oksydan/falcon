const state = {
  errorMsg: '',
  isUpdateOperation: false,
  hasError: false,
};

/**
 * Store for cart state
 * @module
 * @returns {object}
 */
const cartStateStore = () => {
  /**
   * Sets the error message
   * @method setErrorMsg
   * @public
   * @param {string} value
   */
  const setErrorMsg = (value) => {
    state.errorMsg = value;
  };

  /**
   * Returns the error message
   * @method getErrorMsg
   * @public
   * @return {string}
   */
  const getErrorMsg = () => state.errorMsg;

  /**
   * Sets the isUpdateOperation value
   * @method setIsUpdateOperation
   * @public
   * @param {boolean} value
   */
  const setIsUpdateOperation = (value) => {
    state.isUpdateOperation = value;
  };

  /**
   * Returns the isUpdateOperation value
   * @method getIsUpdateOperation
   * @public
   * @return {boolean}
   */
  const getIsUpdateOperation = () => state.isUpdateOperation;

  /**
   * Sets the hasError value
   * @method setHasError
   * @public
   * @param {boolean} value
   */
  const setHasError = (value) => {
    state.hasError = value;
  };

  /**
   * Returns the hasError value
   * @method getHasError
   * @public
   * @return {boolean}
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
