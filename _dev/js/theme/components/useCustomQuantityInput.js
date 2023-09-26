/**
 * Custom quantity input
 * @module useCustomQuantityInput
 * @param {HTMLElement} spinnerElement - spinner element to initialize (required)
 * @param {object} configuration - configuration object (optional)
 * @param {string} configuration.spinnerInitializedClass - class to add when spinner is initialized (default: js-custom-qty-spinner-initialized)
 * @param {string} configuration.spinnerInputClass - class of the input element (default: js-custom-qty-spinner-input)
 * @param {string} configuration.spinnerBtnClassUp - class of the up button (default: js-custom-qty-btn-up)
 * @param {string} configuration.spinnerBtnClassDown - class of the down button (default: js-custom-qty-btn-down)
 * @param {number} configuration.defaultMinQty - default minimum quantity (default: 1)
 * @param {number} configuration.defaultMaxQty - default maximum quantity (default: 1000000)
 * @param {number} configuration.timeout - timeout in ms to wait before dispatching change event (default: 500)
 * @param {function} configuration.onQuantityChange - callback function to call when quantity changes
 */
const useCustomQuantityInput = (spinnerElement, {
  spinnerInitializedClass = 'js-custom-qty-spinner-initialized',
  spinnerInputClass = 'js-custom-qty-spinner-input',
  spinnerBtnClassUp = 'js-custom-qty-btn-up',
  spinnerBtnClassDown = 'js-custom-qty-btn-down',
  defaultMinQty = 1,
  defaultMaxQty = 1000000,
  timeout = 500,
  onQuantityChange = () => {},
}) => {
  /**
   * Timeout id
   * @private
   * @type {int|null}
   */
  let timeoutId = null;
  /**
   * Start value
   * @private
   * @type {int|null}
   */
  let startValue = null;
  /**
   * Minimum quantity
   * @private
   * @type {int|null}
   */
  let minQty = null;

  /**
   * Maximum quantity
   * @private
   * @type {int|null}
   */
  let maxQty = null;

  /**
   * Current quantity
   * @private
   * @type {int|null}
   */
  let currentQty = null;

  /**
   * DOM elements
   * @private
   * @type {Object|null}
   */
  let DOMElements = null;

  /**
   * Set DOM elements
   * @method setDOMElements
   * @private
   * @returns {{input: HTMLElement | undefined, btnUp: HTMLElement | undefined, btnDown: HTMLElement | undefined}}
   */
  const setDOMElements = () => {
    const elements = {
      input: spinnerElement?.querySelector(`.${spinnerInputClass}`),
      btnUp: spinnerElement?.querySelector(`.${spinnerBtnClassUp}`),
      btnDown: spinnerElement?.querySelector(`.${spinnerBtnClassDown}`),
    };

    DOMElements = elements;

    return elements;
  };

  /**
   * Get DOM elements
   * @method getDOMElements
   * @public
   * @returns {{input: (HTMLElement|undefined), btnUp: (HTMLElement|undefined), btnDown: (HTMLElement|undefined)}}
   */
  const getDOMElements = () => (DOMElements || setDOMElements());

  /**
   * Reset DOM elements
   * @method resetDomElements
   * @private
   * @returns {void}
   */
  const resetDomElements = () => {
    DOMElements = null;
  };

  /**
   * Set initial value
   * @method setInitialValue
   * @private
   * @returns {void}
   */
  const setInitialValue = () => {
    const { input } = getDOMElements();
    startValue = input.value ? parseInt(input.value, 10) : defaultMinQty;
    currentQty = startValue;
    minQty = input.getAttribute('min') ? parseInt(input.getAttribute('min'), 10) : defaultMinQty;
    maxQty = input.getAttribute('max') ? parseInt(input.getAttribute('max'), 10) : defaultMaxQty;
  };

  /**
   * Should dispatch change event
   * @method shouldDispatchChange
   * @private
   * @returns {boolean}
   */
  const shouldDispatchChange = () => currentQty !== startValue;

  /**
   * Get operation type
   * @method getOperationType
   * @private
   * @returns {string} increase|decrease
   */
  const getOperationType = () => {
    if (currentQty > startValue) {
      return 'increase';
    }

    return 'decrease';
  };

  /**
   * Get quantity difference
   * @method getQtyDifference
   * @private
   * @returns {number}
   */
  const getQtyDifference = () => Math.abs(currentQty - startValue);

  /**
   * Dispatch change event
   * @method dispatchChange
   * @private
   * @returns {void}
   */
  const dispatchChange = () => {
    clearTimeout(timeoutId);

    if (!shouldDispatchChange()) {
      return;
    }

    timeoutId = setTimeout(() => {
      onQuantityChange({
        startValue,
        qty: currentQty,
        operation: getOperationType(),
        qtyDifference: getQtyDifference(),
      });

      setInitialValue();
    }, timeout);
  };

  /**
   * Set quantity
   * @param {number} qty - quantity to set
   * @method setQty
   * @private
   * @returns {void}
   */
  const setQty = (qty) => {
    const { input } = getDOMElements();

    currentQty = qty;
    input.value = qty;

    dispatchChange();
  };

  /**
   * Handle click up
   * @param {Event} event - event object
   * @method handleClickUp
   * @private
   * @returns {void}
   */
  const handleClickUp = (event) => {
    event.preventDefault();

    let newQty = parseInt(currentQty, 10) + 1;

    if (newQty >= maxQty) {
      newQty = maxQty;
    }

    setQty(newQty);
  };

  /**
   * Handle click down
   * @param {Event} event - event object
   * @method handleClickDown
   * @private
   * @returns {void}
   */
  const handleClickDown = (event) => {
    event.preventDefault();

    let newQty = parseInt(currentQty, 10) - 1;

    if (newQty < minQty) {
      newQty = minQty;
    }

    setQty(newQty);
  };

  /**
   * Handle input change
   * @method handleInputChange
   * @private
   * @returns {void}
   */
  const handleInputChange = () => {
    const { input } = getDOMElements();
    let newQty = parseInt(input.value, 10);

    if (Number.isNaN(newQty) || newQty < minQty) {
      newQty = minQty;
    }

    if (newQty > maxQty) {
      newQty = maxQty;
    }

    setQty(newQty);
  };

  /**
   * Add initialized class
   * @method setInitializedClass
   * @private
   * @returns {void}
   */
  const setInitializedClass = () => {
    spinnerElement?.classList.add(spinnerInitializedClass);
  };

  /**
   * Remove initialized class
   * @method removeInitializedClass
   * @private
   * @returns {void}
   */
  const removeInitializedClass = () => {
    spinnerElement?.classList.remove(spinnerInitializedClass);
  };

  /**
   * Detach events from DOM elements
   * @method detachEvents
   * @private
   * @returns {void}
   */
  const detachEvents = () => {
    const { input, btnUp, btnDown } = getDOMElements();

    removeInitializedClass();

    btnUp?.removeEventListener('click', handleClickUp);
    btnDown?.removeEventListener('click', handleClickDown);
    input?.removeEventListener('keyup', handleInputChange);
    input?.removeEventListener('blur', handleInputChange);
  };

  /**
   * Attach events to DOM elements
   * @method attachEvents
   * @private
   * @returns {void}
   */
  const attachEvents = () => {
    const { input, btnUp, btnDown } = getDOMElements();

    setInitializedClass();

    btnUp?.addEventListener('click', handleClickUp);
    btnDown?.addEventListener('click', handleClickDown);
    input?.addEventListener('keyup', handleInputChange);
    input?.addEventListener('blur', handleInputChange);
  };

  /**
   * Destroy spinner instance and detach events
   * @method destroy
   * @static
   * @returns {void}
   */
  const destroy = () => {
    detachEvents();
    resetDomElements();
  };

  /**
   * Initialize spinner instance and attach events
   * @method init
   * @static
   * @returns {void}
   */
  const init = () => {
    destroy();
    setInitialValue();
    detachEvents();
    attachEvents();
  };

  return {
    init,
    destroy,
    getDOMElements,
  };
};

export default useCustomQuantityInput;
