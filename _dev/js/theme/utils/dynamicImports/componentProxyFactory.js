/**
 * Handles the proxy get operation for a component.
 *
 * @function
 * @name handleProxyGet
 * @param {HTMLElement} element - The component element.
 * @param {function} proxyMethodHandler - The proxy method handler.
 * @returns {function(*, *, *): (*)|*} - The proxy handler function.
 */
const handleProxyGet = (element, proxyMethodHandler) => (target, prop, receiver) => {
  if (target[prop] !== undefined) {
    return target[prop];
  }

  return (...args) => proxyMethodHandler(target, prop, receiver, element, args);
};

/**
 * Creates a proxy for a component.
 *
 * @function
 * @name componentProxyFactory
 * @param {HTMLElement} element - The component element.
 * @param {object} options - The component options.
 * @param {function} proxyMethodHandler - The proxy method handler.
 * @returns {{_options, _element}} - The component proxy.
 */
const componentProxyFactory = (
  element,
  options,
  proxyMethodHandler = () => {},
) => {
  const pluginObject = {
    _element: element,
    _options: options,
  };

  const proxyHandler = {
    get: handleProxyGet(element, proxyMethodHandler),
  };

  return new Proxy(pluginObject, proxyHandler);
};

export default componentProxyFactory;
