/**
 * A set to track exposed function names.
 * @type {Set<string>}
 */
const exposeSet = new Set();

/**
 * Exposes a function globally by assigning it to the window object.
 *
 * @param {string} name - The name under which the function will be exposed globally.
 * @param {Function} fnc - The function to be exposed.
 * @throws Will throw an error if the specified name is already in use for global exposure.
 */
const exposeToWindow = (name, fnc) => {
  /**
   * Throws an error if the specified name is already in use for global exposure.
   * @throws Error
   */
  const throwErrorIfAlreadyExposed = () => {
    if (exposeSet.has(name)) {
      throw new Error(`"${name}" is already exposed`);
    }
  };

  throwErrorIfAlreadyExposed();
  exposeSet.add(name);
  window[name] = fnc;
};

export default exposeToWindow;
