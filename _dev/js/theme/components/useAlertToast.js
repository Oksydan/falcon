import parseToHtml from '@js/theme/utils/parseToHtml';

let id = 0;

const getId = (prefix = 'alert_toast_') => {
  id += 1;
  return prefix + id;
};

const useAlertToast = (params) => {
  const {
    duration = 4000,
  } = params || {};
  const stackTemplateId = 'alert-toast-stack';
  const bodyElement = document.querySelector('body');

  const buildToastTemplate = (text, type, toastId) => parseToHtml(`
    <div class="alert-toast alert-toast--${type} d-none" id=${toastId}>
      <div class="alert-toast__content">
        ${text}
      </div>
    </div>
  `);

  const buildToastStackTemplate = () => parseToHtml(`
    <div id="${stackTemplateId}" class="alert-toast-stack">
    </div>
  `);

  const getToastStackTemplate = () => {
    const getElement = () => document.querySelector(`#${stackTemplateId}`);

    if (!getElement()) {
      bodyElement.append(buildToastStackTemplate());
    }

    return getElement();
  };

  const hideToast = (toast) => {
    toast.classList.remove('show');

    const hideDuration = (parseFloat(window.getComputedStyle(toast).transitionDuration)) * 1000;

    setTimeout(() => {
      toast.remove();
    }, hideDuration);
  };

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

  const info = (text, timeOut = false) => {
    showToast(text, 'info', timeOut);
  };

  const success = (text, timeOut = false) => {
    showToast(text, 'success', timeOut);
  };

  const danger = (text, timeOut = false) => {
    showToast(text, 'danger', timeOut);
  };

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
