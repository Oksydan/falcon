import useEvent from '../../components/event/useEvent';

const { on, off } = useEvent();

const useBootstrapComponentDynamicImport = (importFiles, {
  componentName = '',
  events = [],
  onLoad = () => {},
}) => {
  let filesLoaded = false;
  const callStack = [];
  const jQueryCallStack = [];
  const instancesMap = new Map();

  const setInstanceInMap = (element, instance) => {
    if (!instancesMap.has(element)) {
      instancesMap.set(element, instance);
    }
  };

  const getInstanceFromMap = (element) => {
    if (!instancesMap.has(element)) {
      return null;
    }

    return instancesMap.get(element);
  };

  if (!componentName) {
    throw new Error('Component name is required');
  }

  const getJQueryComponentName = () => componentName.charAt(0).toLowerCase() + componentName.slice(1);

  const isJQueryEnabled = () => {
    try {
      return !!window.jQuery;
    } catch (e) {
      return false;
    }
  };

  const loadFiles = () => {
    filesLoaded = true;

    return Promise.all(importFiles()).then((files) => {
      files.forEach((file) => {
        if (file.default) {
          window.bootstrap[componentName] = file.default;
        }
      });
    });
  };

  const executeCallStack = () => {
    callStack.forEach(({ args, instanceMethodCall, componentInstance }, i) => {
      componentInstance = new window.bootstrap[componentName](args);

      callStack[i].componentInstance = componentInstance;

      setInstanceInMap(componentInstance._element, componentInstance);

      instanceMethodCall.forEach(({ prop, methodArgs }) => {
        componentInstance[prop](...methodArgs);
      });
    });

    if (isJQueryEnabled()) {
      jQueryCallStack.forEach(({ elem, args }) => {
        window.jQuery(elem)[getJQueryComponentName()](args);
      });
    }
  };

  const handleEvent = async (e) => {
    e.preventDefault();

    // DISABLE FOR NOW BEFORE REFACTORING
    /* eslint-disable */
    await handleComponentLoad();
    /* eslint-enable */

    const { currentTarget, type } = e;

    currentTarget.dispatchEvent(new Event(type));
  };

  const unbindEvents = () => {
    events.forEach(({
      name = '',
      selector = '',
    }) => {
      if (!name || !selector) {
        throw new Error('Event name and selector are required');
      }

      off(
        document,
        name,
        selector,
        handleEvent,
      );
    });
  };

  const bindEvents = () => {
    events.forEach(({
      name = '',
      selector = '',
    }) => {
      if (!name || !selector) {
        throw new Error('Event name and selector are required');
      }

      on(
        document,
        name,
        selector,
        handleEvent,
      );
    });
  };

  const handleComponentLoad = async () => {
    if (filesLoaded) {
      return;
    }

    unbindEvents();
    await loadFiles();
    onLoad();
    executeCallStack();
  };

  const proxyFactory = (pluginInstance) => {
    const pluginObject = {};
    const proxyHandler = {
      get(target, prop, receiver) {
        return (...args) => {
          if (!filesLoaded) {
            pluginInstance.instanceMethodCall.push({
              prop,
              args,
            });

            handleComponentLoad();
          }

          if (pluginInstance.componentInstance !== null) {
            pluginInstance.componentInstance[prop](...args);
          }

          return receiver;
        };
      },
    };

    return new Proxy(pluginObject, proxyHandler);
  };

  const getComponentInstance = (element) => getInstanceFromMap(element);

  function ComponentObjectConstructorFunction(args) {
    const pluginInstance = {
      args,
      instanceMethodCall: [],
      componentInstance: null,
    };

    pluginInstance.proxyInstance = proxyFactory(pluginInstance);

    callStack.push(pluginInstance);

    return pluginInstance.proxyInstance;
  }

  const getOrCreateInstance = (element) => {
    const pluginInstance = getComponentInstance(element);

    if (pluginInstance) {
      return pluginInstance.proxyInstance;
    }

    const proxyInstance = new ComponentObjectConstructorFunction(element);

    setInstanceInMap(element, proxyInstance);

    return proxyInstance;
  };

  ComponentObjectConstructorFunction.getOrCreateInstance = getOrCreateInstance;
  ComponentObjectConstructorFunction.getInstance = getComponentInstance;

  const handleJQueryPluginCall = (args) => {
    jQueryCallStack.push({
      elem: this,
      args,
    });

    handleComponentLoad();
  };

  window.bootstrap = window.bootstrap || {};
  window.bootstrap[componentName] = ComponentObjectConstructorFunction;

  if (isJQueryEnabled()) {
    window.jQuery.fn[getJQueryComponentName()] = handleJQueryPluginCall;
  }

  const init = () => {
    bindEvents();
  };

  return {
    init,
  };
};

export default useBootstrapComponentDynamicImport;
