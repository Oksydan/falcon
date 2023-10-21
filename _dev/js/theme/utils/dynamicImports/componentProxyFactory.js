const handleProxyGet = (element, proxyMethodHandler) => (target, prop, receiver) => {
  if (target[prop] !== undefined) {
    return target[prop];
  }

  return (...args) => proxyMethodHandler(target, prop, receiver, element, args);
};

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
