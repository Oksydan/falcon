import { each } from '../utils/DOMHelpers';
import $ from "jquery";

const supportedValidity = () => {
  const input = document.createElement('input');
  const validityProps = [
    'validity',
    'badInput',
    'patternMismatch',
    'rangeOverflow',
    'rangeUnderflow',
    'tooLong',
    'tooShort',
    'typeMismatch',
    'valid',
    'valueMissing',
  ];

  return validityProps.every((prop) => prop in input.validity);
};

const togglePasswordVisibility = (btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const input = btn.closest('.js-parent-focus').querySelector('.js-visible-password');

    if (input.getAttribute('type') === 'password') {
      input.setAttribute('type', 'text');
      btn.innerHTML = btn.getAttribute('data-text-hide');
    } else {
      input.setAttribute('type', 'password');
      btn.innerHTML = btn.getAttribute('data-text-show');
    }
  });
};

const formValidation = (form) => {
  if (!supportedValidity()) {
    return;
  }

  const divToScroll = { value: null };

  Array.from(form.querySelectorAll('input, textarea')).forEach(field => {
    field.addEventListener('blur', (e) => {
      const inputField = e.currentTarget;
      inputField.value = inputField.value.trim();
    });
  });

  form.addEventListener('submit', (event) => {
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      Array.from(form.querySelectorAll('input:invalid, select:invalid, textarea:invalid')).forEach(field => {
        const inputField = field;
        const parent = inputField.closest('.form-group');
        const invalidFeedback = parent.querySelector('.js-invalid-feedback-browser');

        invalidFeedback.textContent = inputField.validationMessage;

        if (!divToScroll.value) {
          divToScroll.value = parent;
        }
      });

      const submitButton = form.querySelector('[type="submit"]');
      form.dataset.disabled = false;
      submitButton.classList.remove('disabled');
    }

    form.classList.add('was-validated');

    if (divToScroll.value) {
      window.scrollTo({
        top: divToScroll.value.offsetTop,
        behavior: 'smooth',
      });

      divToScroll.value = null;
    }
  }, false);
};

const useThemeForm = (
  validationFormSelector = '.js-needs-validation',
  passwordToggleSelector = '[data-action="show-password"]',
) => {
  const DOM_SELECTORS = {
    SELECT_LINK: '.js-select-link',
  }

  const handleSelectChange = (event) => {
    const target = event.target;

    if (target) {
      window.location.href = target.value;
    }
  }

  const init = () => {
    each(document.querySelectorAll(passwordToggleSelector), togglePasswordVisibility);
    each(document.querySelectorAll(validationFormSelector), formValidation);
    each(document.querySelectorAll(DOM_SELECTORS.SELECT_LINK), (select) => {
      select.addEventListener('change', handleSelectChange);
    });
  }

  return {
    init,
  }
};

export default useThemeForm;
