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

  if (!componentName) {
    throw new Error('Component name is required');
  }

  const DATA_KEY = 'dynamic_import.' + componentName;

  const getJQueryComponentName = () => componentName.charAt(0).toLowerCase() + componentName.slice(1);

  const isJQueryEnabled = () => {
    try {
      return !!window.jQuery;
    } catch (e) {
      return false;
    }
  }

  const handleComponentLoad = async () => {
    if (filesLoaded) {
      return;
    }

    unbindEvents();
    await loadFiles();
    onLoad();
    executeCallStack();
  };

  const getOrCreateInstance = (element) => {
    const pluginInstance = getComponentInstance(element);

    if (pluginInstance) {
      return pluginInstance.instanceProxy;
    }

    return new ComponentObjectConstructorFunction(element);
  }

  const getComponentInstance = (element) => {
    const pluginInstance = callStack.find(({ element: instanceElement }) => instanceElement === element);

    return pluginInstance ? pluginInstance.componentInstance : null;
  }

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
      }
    }

    return new Proxy(pluginObject, proxyHandler)
  }

  const ComponentObjectConstructorFunction = function(args) {
    const pluginInstance = {
      args,
      instanceMethodCall: [],
      componentInstance: null,
      element: null,
    }

    pluginInstance.instanceProxy = proxyFactory(pluginInstance);

    callStack.push(pluginInstance);

    return pluginInstance.instanceProxy;
  };

  ComponentObjectConstructorFunction.getOrCreateInstance = getOrCreateInstance;
  ComponentObjectConstructorFunction.getInstance = getComponentInstance;

  const handleJQueryPluginCall = function(args) {
    jQueryCallStack.push({
      elem: this,
      args,
    });

    handleComponentLoad();
  }

  const executeCallStack = () => {
    callStack.forEach(({ args, instanceMethodCall, componentInstance }, i) => {
      componentInstance = new window.bootstrap[componentName](args);

      callStack[i].componentInstance = componentInstance;
      callStack[i].element = componentInstance._element;

      instanceMethodCall.forEach(({ prop, args }) => {
        componentInstance[prop](...args);
      });
    });

    if (isJQueryEnabled()) {
      jQueryCallStack.forEach(({ elem, args }) => {
        window.jQuery(elem)[getJQueryComponentName()](args);
      });
    }
  };

  window.bootstrap = window.bootstrap || {};
  window.bootstrap[componentName] = ComponentObjectConstructorFunction;

  if (isJQueryEnabled()) {
    window.jQuery.fn[getJQueryComponentName()] = handleJQueryPluginCall;
  }

  const handleEvent = async (e) => {
    e.preventDefault();
    await handleComponentLoad();

    const { currentTarget, type } = e;

    currentTarget.dispatchEvent(new Event(type));
  }

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
        handleEvent
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
        handleEvent
      );
    });
  };

  const init = () => {
    bindEvents();
  };

  return {
    init,
  };
};

export default useBootstrapComponentDynamicImport;
