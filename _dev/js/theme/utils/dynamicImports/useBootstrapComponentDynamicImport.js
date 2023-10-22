import useInstanceMap from './useInstanceMap';
import useDynamicImportEventsHandler from './useDynamicImportEventsHandler';
import useFunctionCallstackMap from './useFunctionCallstackMap';
import componentProxyFactory from './componentProxyFactory';

const isJQueryEnabled = () => {
  try {
    return !!window.jQuery;
  } catch (e) {
    return false;
  }
};

const useBootstrapComponentDynamicImport = (importFiles, {
  componentName,
  events = [],
}) => {
  if (!componentName) {
    throw new Error('Component name is required');
  }

  let filesLoaded = false;
  let filesLoading = false;
  const {
    getCallbacksForElement,
    setCallbackForElement,
    removeCallbacksForElement,
    createCallbackObject,
  } = useFunctionCallstackMap(componentName);
  const {
    setCallbackForElement: jQuerySetCallbackForElement,
    removeCallbacksForElement: jQueryRemoveCallbacksForElement,
    createCallbackObject: jQueryCreateCallbackObject,
    getAllCallbacksForComponent: jQueryGetAllCallbacksForComponent,
  } = useFunctionCallstackMap(`jQuery_${componentName}`);
  const {
    getInstanceFromMap,
    setInstanceInMap,
    removeInstanceFromMap,
    getAllInstancesForComponent,
  } = useInstanceMap(componentName);

  const getJQueryComponentName = () => componentName.toLowerCase();

  const loadFiles = () => Promise.all(importFiles()).then((files) => {
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];

      if (file.default) {
        window.bootstrap[componentName] = file.default;
        break;
      }
    }

    filesLoaded = true;
    filesLoading = false;
  });

  const executeComponentInitializationAndCallbackCalls = () => {
    const instances = getAllInstancesForComponent();

    if (instances) {
      instances.forEach((proxy, element) => {
        const {
          _options: options,
        } = proxy;

        const instance = new window.bootstrap[componentName](element, options);
        setInstanceInMap(element, instance);

        const callbacks = getCallbacksForElement(element);

        if (callbacks) {
          callbacks.forEach((callbackObject) => {
            const {
              prop,
              args,
            } = callbackObject;

            instance[prop](...args);
          });

          removeCallbacksForElement(element);
        }
      });
    }

    if (isJQueryEnabled()) {
      const allCallbacks = jQueryGetAllCallbacksForComponent();

      if (allCallbacks) {
        allCallbacks.forEach((callbacks, jqueryObject) => {
          callbacks.forEach((callbackObject) => {
            const {
              prop,
              args,
            } = callbackObject;

            jqueryObject[prop](...args);
          });

          jQueryRemoveCallbacksForElement(jqueryObject);
        });
      }
    }
  };

  const handleComponentLoad = async () => {
    if (filesLoaded || filesLoading) {
      return;
    }

    filesLoading = true;

    // eslint-disable-next-line no-use-before-define
    unbindEvents();
    await loadFiles();
    executeComponentInitializationAndCallbackCalls();
  };

  const handleEvent = async (e) => {
    e.preventDefault();

    await handleComponentLoad();

    const { delegateTarget, type } = e;

    delegateTarget.dispatchEvent(new Event(type));
  };

  const { bindEvents, unbindEvents } = useDynamicImportEventsHandler(events, handleEvent);

  const getComponentInstance = (element) => getInstanceFromMap(element);

  const proxyMethodCallHandler = (target, prop, receiver, element, args) => {
    const instance = getInstanceFromMap(element);

    if (!filesLoaded) {
      setCallbackForElement(element, createCallbackObject(prop, args));

      handleComponentLoad();
    } else {
      if (instance !== null) {
        instance[prop](...args);
      }

      if (prop === 'dispose' && instance !== null) {
        removeInstanceFromMap(element);
      }
    }

    return receiver;
  };

  function ComponentObjectConstructorFunction(selectorOrElement, options = {}) {
    const element = selectorOrElement instanceof Element ? selectorOrElement : document.querySelector(selectorOrElement);
    const componentInstanceProxy = componentProxyFactory(element, options, proxyMethodCallHandler);

    setInstanceInMap(element, componentInstanceProxy);

    return componentInstanceProxy;
  }

  ComponentObjectConstructorFunction.getOrCreateInstance = (element, options) => {
    const componentInstance = getComponentInstance(element);

    if (componentInstance) {
      return componentInstance;
    }

    return new ComponentObjectConstructorFunction(element, options);
  };

  ComponentObjectConstructorFunction.getInstance = getComponentInstance;

  window.bootstrap = window.bootstrap || {};
  window.bootstrap[componentName] = ComponentObjectConstructorFunction;
  window.bootstrap[componentName].NAME = componentName.toLowerCase();

  if (isJQueryEnabled()) {
    window.jQuery.fn[getJQueryComponentName()] = function jqueryFunctionCallback(...args) {
      jQuerySetCallbackForElement(this, jQueryCreateCallbackObject(getJQueryComponentName(), args));

      handleComponentLoad();
    };
  }

  const init = () => {
    bindEvents();
  };

  return {
    init,
  };
};

export default useBootstrapComponentDynamicImport;
