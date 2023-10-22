/**
 * @method handleProxyGet
 * @param element
 * @param proxyMethodHandler
 * @return {(function(*, *, *): (*))|*}
 */
const handleProxyGet = (element, proxyMethodHandler) => (target, prop, receiver) => {
  if (target[prop] !== undefined) {
    return target[prop];
  }

  return (...args) => proxyMethodHandler(target, prop, receiver, element, args);
};

/**
 * @method componentProxyFactory
 * @param element {HTMLElement} - component element
 * @param options {object} - component options
 * @param proxyMethodHandler {function} - proxy method handler
 * @return {{_options, _element}} - component proxy
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
