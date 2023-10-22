import parseToHtml from '@js/theme/utils/parseToHtml';

let id = 0;

/**
 * Generates a unique ID with an optional prefix.
 * @param {string} [prefix='alert_toast_'] - The optional prefix for the generated ID.
 * @returns {string} - The generated unique ID.
 */
const getId = (prefix = 'alert_toast_') => {
  id += 1;
  return prefix + id;
};

/**
 * Creates and manages toast notifications.
 * @param {Object} params - Configuration parameters for the toast notifications.
 * @param {number} [params.duration=4000] - Duration in milliseconds for which the toast is displayed.
 * @returns {Object} - An object containing methods for showing different types of toasts.
 */
const useAlertToast = (params) => {
  const {
    duration = 4000,
  } = params || {};

  const stackTemplateId = 'alert-toast-stack';
  const bodyElement = document.querySelector('body');

  /**
   * Builds the template for an individual toast.
   * @param {string} text - The text content of the toast.
   * @param {string} type - The type of toast ('info', 'success', 'danger', 'warning').
   * @param {string} toastId - The unique ID for the toast element.
   * @returns {HTMLElement} - The constructed toast element.
   */
  const buildToastTemplate = (text, type, toastId) => parseToHtml(`
    <div class="alert-toast alert-toast--${type} d-none" id=${toastId}>
      <div class="alert-toast__content">
        ${text}
      </div>
    </div>
  `);

  /**
   * Builds the template for the toast stack container.
   * @returns {HTMLElement} - The constructed toast stack container element.
   */
  const buildToastStackTemplate = () => parseToHtml(`
    <div id="${stackTemplateId}" class="alert-toast-stack">
    </div>
  `);

  /**
   * Retrieves the toast stack container element, creating it if necessary.
   * @returns {HTMLElement} - The toast stack container element.
   */
  const getToastStackTemplate = () => {
    const getElement = () => document.querySelector(`#${stackTemplateId}`);

    if (!getElement()) {
      bodyElement.append(buildToastStackTemplate());
    }

    return getElement();
  };

  /**
   * Hides a toast element.
   * @param {HTMLElement} toast - The toast element to hide.
   */
  const hideToast = (toast) => {
    toast.classList.remove('show');

    const hideDuration = (parseFloat(window.getComputedStyle(toast).transitionDuration)) * 1000;

    setTimeout(() => {
      toast.remove();
    }, hideDuration);
  };

  /**
   * Displays a toast with the given text, type, and optional timeout duration.
   * @param {string} text - The text content of the toast.
   * @param {string} type - The type of toast ('info', 'success', 'danger', 'warning').
   * @param {number|boolean} [timeOut=false] - Optional timeout duration for the toast.
   */
  const showToast = (text, type, timeOut = false) => {
    const toastId = getId();
    const toast = buildToastTemplate(text, type, toastId);
    const toastStack = getToastStackTemplate();
    timeOut = timeOut || duration;

    toastStack.prepend(toast);

    const toastInDOM = document.querySelector(`#${toastId}`);

    toastInDOM.classList.remove('d-none');

    setTimeout(() => {
      toastInDOM.classList.add('show');
    }, 10);

    toastInDOM.dataset.timeoutId = setTimeout(() => {
      hideToast(toastInDOM);
    }, timeOut);
  };

  /**
   * Displays an information toast.
   * @param {string} text - The text content of the toast.
   * @param {number|boolean} [timeOut=false] - Optional timeout duration for the toast.
   */
  const info = (text, timeOut = false) => {
    showToast(text, 'info', timeOut);
  };

  /**
   * Displays a success toast.
   * @param {string} text - The text content of the toast.
   * @param {number|boolean} [timeOut=false] - Optional timeout duration for the toast.
   */
  const success = (text, timeOut = false) => {
    showToast(text, 'success', timeOut);
  };

  /**
   * Displays a danger toast.
   * @param {string} text - The text content of the toast.
   * @param {number|boolean} [timeOut=false] - Optional timeout duration for the toast.
   */
  const danger = (text, timeOut = false) => {
    showToast(text, 'danger', timeOut);
  };

  /**
   * Displays a warning toast.
   * @param {string} text - The text content of the toast.
   * @param {number|boolean} [timeOut=false] - Optional timeout duration for the toast.
   */
  const warning = (text, timeOut = false) => {
    showToast(text, 'warning', timeOut);
  };

  return {
    info,
    success,
    danger,
    warning,
    showToast,
  };
};

export default useAlertToast;
