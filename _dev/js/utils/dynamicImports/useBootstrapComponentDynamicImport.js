import useInstanceMap from './useInstanceMap';
import useDynamicImportEventsHandler from './useDynamicImportEventsHandler';
import useFunctionCallstackMap from './useFunctionCallstackMap';
import componentProxyFactory from './componentProxyFactory';

/**
 * Checks if jQuery is enabled.
 *
 * @function
 * @name isJQueryEnabled
 * @returns {boolean} - Whether jQuery is enabled or not.
 */
const isJQueryEnabled = () => {
  try {
    return !!window.jQuery;
  } catch (e) {
    return false;
  }
};

/**
 * Dynamically loads and initializes Bootstrap components with optional jQuery support.
 *
 * @param {Function[]} importFiles - Array of functions that import the necessary files for the component.
 * @param {Object} options - Configuration options.
 * @param {string} options.componentName - Name of the Bootstrap component.
 * @param {string[]} [options.events=[]] - List of events to bind for dynamic loading.
 * @returns {Object} - Object with an `init` function for initializing the dynamic loading.
 * @throws {Error} - Throws an error if the component name is not provided.
 */
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

  /**
   * Handles the loading of component files.
   * @returns {Promise<void>} - A Promise that resolves when files are loaded.
   */
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

  /**
   * Executes component initialization and callback calls.
   * @returns {void}
   */
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

  /**
   * Handles the loading of the component.
   * @returns {Promise<void>} - A Promise that resolves when the component is loaded.
   */
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

  /**
   * Handles events triggered during dynamic loading.
   * @param {Event} e - The event object.
   * @returns {Promise<void>} - A Promise that resolves when the event is handled.
   */
  const handleEvent = async (e) => {
    e.preventDefault();

    if (filesLoaded || filesLoading) {
      return;
    }

    await handleComponentLoad();

    const { delegateTarget, type } = e;

    delegateTarget.dispatchEvent(new Event(type));
  };

  /**
   * Binds events for dynamic loading.
   * @type {Object}
   * @property {Function} bindEvents - Binds events.
   * @property {Function} unbindEvents - Unbinds events.
   */
  const { bindEvents, unbindEvents } = useDynamicImportEventsHandler(events, handleEvent);

  /**
   * Gets the component instance associated with an element.
   * @param {HTMLElement} element - The HTML element.
   * @returns {Object|null} - The component instance or null if not found.
   */
  const getComponentInstance = (element) => getInstanceFromMap(element);

  /**
   * Handles proxy method calls for the component.
   * @param {Object} target - The target object.
   * @param {string} prop - The property being accessed.
   * @param {Object} receiver - The receiver object.
   * @param {HTMLElement} element - The HTML element associated with the component.
   * @param {Array} args - The arguments passed to the method.
   * @returns {Object} - The receiver object.
   */
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

  /**
   * Constructor function for creating Bootstrap component instances.
   * @param {string|HTMLElement} selectorOrElement - Selector or HTML element.
   * @param {Object} [options={}] - Component options.
   * @returns {Object} - The component instance proxy.
   */
  function ComponentObjectConstructorFunction(selectorOrElement, options = {}) {
    const element = selectorOrElement instanceof Element ? selectorOrElement : document.querySelector(selectorOrElement);
    const componentInstanceProxy = componentProxyFactory(element, options, proxyMethodCallHandler);

    setInstanceInMap(element, componentInstanceProxy);

    return componentInstanceProxy;
  }

  /**
   * Gets or creates a component instance for a given element.
   * @param {HTMLElement} element - The HTML element.
   * @param {Object} options - Component options.
   * @returns {Object} - The component instance.
   */
  ComponentObjectConstructorFunction.getOrCreateInstance = (element, options) => {
    const componentInstance = getComponentInstance(element);

    if (componentInstance) {
      return componentInstance;
    }

    return new ComponentObjectConstructorFunction(element, options);
  };

  /**
   * Gets an existing component instance for a given element.
   * @param {HTMLElement} element - The HTML element.
   * @returns {Object|null} - The existing component instance or null if not found.
   */
  ComponentObjectConstructorFunction.getInstance = getComponentInstance;

  window.bootstrap = window.bootstrap || {};
  window.bootstrap[componentName] = ComponentObjectConstructorFunction;
  window.bootstrap[componentName].NAME = componentName.toLowerCase();

  if (isJQueryEnabled()) {
    window.jQuery.fn[getJQueryComponentName()] = function jqueryFunctionCallback(...args) {
      jQuerySetCallbackForElement(this, jQueryCreateCallbackObject(getJQueryComponentName(), args));

      handleComponentLoad();

      return this;
    };
  }

  /**
   * Initializes the dynamic loading of the Bootstrap component.
   * @returns {void}
   */
  const init = () => {
    bindEvents();
  };

  return {
    init,
  };
};

export default useBootstrapComponentDynamicImport;
