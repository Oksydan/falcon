const callbackMap = new Map();

/**
 * Manages a map for function callbacks associated with specific elements or keys.
 *
 * @module useFunctionCallstackMap
 * @description Creates and manages a callback map for function callstacks.
 * @param {string} key - The key for the function callbacks map.
 * @return {{
 *   getCallbacksForElement: function(any): (array|null),
 *   setCallbackForElement: function(any, object): void,
 *   removeCallbacksForElement: function(any): void,
 *   getAllCallbacksForComponent: function(): (any|null),
 *   createCallbackObject: function(string, ...args): CallbackObject
 * }}
 */
const useFunctionCallstackMap = (key) => {
  if (!key) {
    throw new Error('Key is required');
  }

  /**
   * Represents a callback object containing a property and arguments.
   *
   * @class CallbackObject
   * @param {string} prop - The callback function property.
   * @param {...any} args - The callback function arguments.
   * @constructor
   */
  function CallbackObject(prop, args) {
    this.prop = prop;
    this.args = args;
  }

  /**
   * Retrieves the functions callback map for a specific element or key.
   *
   * @method getCallbacksForElement
   * @description Gets the functions callback map for a specified element key.
   * @param {any} elementKey - The element or key to retrieve callbacks for.
   * @public
   * @return {array|null} - An array of callbacks or null if not found.
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
   * Sets a callback for a specific element or key.
   *
   * @method setCallbackForElement
   * @description Sets a callback for a specified element key.
   * @public
   * @param {any} elementKey - The element or key to set the callback for.
   * @param {CallbackObject} callback - The callback object to set.
   * @throws {Error} - If the callback is not an instance of CallbackObject.
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
   * Removes callbacks associated with a specific element or key.
   *
   * @method removeCallbacksForElement
   * @description Removes callbacks associated with a specified element key.
   * @public
   * @param {any} elementKey - The element or key to remove callbacks for.
   * @return {void}
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
   * Retrieves all callbacks for the component.
   *
   * @method getAllCallbacksForComponent
   * @description Gets all callbacks associated with the component.
   * @public
   * @return {any|null} - All callbacks for the component or null if none.
   */
  const getAllCallbacksForComponent = () => {
    if (!callbackMap.has(key)) {
      return null;
    }

    return callbackMap.get(key);
  };

  /**
   * Creates a callback object with a property and arguments.
   *
   * @method createCallbackObject
   * @description Creates a callback object with a specified property and arguments.
   * @public
   * @param {string} prop - The callback function property.
   * @param {...any} args - The callback function arguments.
   * @return {CallbackObject} - The created callback object.
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
