const callbackMap = new Map();

/**
 * @module useFunctionCallstackMap
 * @description create instance map
 * @param {string} key - map key
 * @return {{
 * getCallbacksForElement: (function(any): (null|array)),
 * setCallbackForElement: (function(any, object): (void)),
 * removeCallbacksForElement: (function(any): (void)),
 * getAllCallbacksForComponent: (function(): (any|null)),
 * createCallbackObject: (function(string, ...args): (CallbackObject))
 * }}
 */
const useFunctionCallstackMap = (key) => {
  if (!key) {
    throw new Error('Key is required');
  }

  /**
   * @class CallbackObject
   * @param prop
   * @param args
   * @constructor
   */
  function CallbackObject(prop, args) {
    this.prop = prop;
    this.args = args;
  }

  /**
   * @method getCallbacksForElement
   * @description get functions callback map for elementKey
   * @param {any} elementKey - map elementKey
   * @public
   * @return {array|null} - functions callback map for key or null
   */
  const getCallbacksForElement = (elementKey) => {
    if (!callbackMap.has(key)) {
      return null;
    }

    const functionsCallMap = callbackMap.get(key);

    if (!functionsCallMap.has(elementKey)) {
      return null;
    }

    return functionsCallMap.get(elementKey);
  };

  /**
   * @method setCallbackForElement
   * @description set callback for elementKey
   * @public
   * @param {any} elementKey - component elementKey
   * @param {CallbackObject} callback - callback object
   * @throws {Error} - if callback is not instance of CallbackObject
   * @return {void}
   */
  const setCallbackForElement = (elementKey, callback) => {
    if (!(callback instanceof CallbackObject)) {
      throw new Error('Callback must be instance of CallbackObject, use createCallbackObject function to create it.');
    }

    if (!callbackMap.has(key)) {
      callbackMap.set(key, new Map());
    }

    callbackMap.set(key, new Map());

    const functionsCallMap = callbackMap.get(key);
    const currentCallbacks = functionsCallMap.get(elementKey) || [];
    const callbacks = [...currentCallbacks, callback];

    functionsCallMap.set(elementKey, callbacks);
  };

  /**
   * @method removeCallbacksForElement
   * @description remove component instance from map
   * @public
   * @param {any} elementKey - component elementKey
   */
  const removeCallbacksForElement = (elementKey) => {
    if (!callbackMap.has(key)) {
      return;
    }

    const functionsCallMap = callbackMap.get(key);

    if (!functionsCallMap.has(elementKey)) {
      return;
    }

    functionsCallMap.delete(elementKey);

    if (functionsCallMap.size === 0) {
      callbackMap.delete(key);
    }
  };

  /**
   * @method getAllCallbacksForComponent
   * @description get all callbacks for component
   * @public
   * @return {any|null}
   */
  const getAllCallbacksForComponent = () => {
    if (!callbackMap.has(key)) {
      return null;
    }

    return callbackMap.get(key);
  };

  /**
   * @method createCallbackObject
   * @description create callback object
   * @public
   * @param prop {string} - callback function
   * @param args {...args} - callback arguments
   * @return {CallbackObject} - callback object
   */
  const createCallbackObject = (prop, args) => new CallbackObject(prop, args);

  return {
    getAllCallbacksForComponent,
    getCallbacksForElement,
    setCallbackForElement,
    removeCallbacksForElement,
    createCallbackObject,
  };
};

export default useFunctionCallstackMap;
