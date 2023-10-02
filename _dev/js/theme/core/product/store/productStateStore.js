const state = {
  isOnPopStateEvent: false,
  formChanged: false,
  currentRequestDelayedId: null,
};

/**
 * Store for product state
 * @module
 */
const productStateStore = () => {
  /**
   * Returns true if the current event is a popstate event
   * @method
   * @return {boolean}
   */
  const isOnPopState = () => state.isOnPopStateEvent;

  /**
   * Sets the current event as a popstate event
   * @method
   * @param value {boolean}
   */
  const setOnPopState = (value) => {
    state.isOnPopStateEvent = value;
  };

  /**
   * Sets the form changed state
   * @method
   * @param value {boolean}
   */
  const setFormChanged = (value) => {
    state.formChanged = value;
  };

  /**
   * Returns true if the form has changed
   * @method
   * @return {boolean}
   */
  const isFormChanged = () => state.formChanged;

  /**
   * Returns the current request delayed id
   * @method
   * @return {null|number}
   */
  const getCurrentRequestDelayedId = () => state.currentRequestDelayedId;

  /**
   * Sets the current request delayed id
   * @method
   * @param value {null|number}
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
