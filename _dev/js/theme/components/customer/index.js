import { DOMReady } from '../../../utils/DOM/DOMHelpers';

const initCustomerLinksTriggerActive = () => {
  const url = window.location.pathname;
  const customerLinks = document.querySelectorAll('.js-customer-links a');

  customerLinks.forEach((el) => {
    if (el.getAttribute('href').indexOf(url) !== -1) {
      el.classList.add('active');
    }
  });
};

const initRmaForm = () => {
  const returnForm = document.querySelector(prestashop.selectors.order.returnForm);

  if (!returnForm) {
    return;
  }

  returnForm.querySelector('thead input[type=checkbox]').addEventListener('click', ({ currentTarget }) => {
    const { checked } = currentTarget;
    returnForm.querySelectorAll('tbody input[type=checkbox]').forEach((checkbox) => {
      checkbox.checked = checked;
    });
  });
};

DOMReady(() => {
  initCustomerLinksTriggerActive();
  initRmaForm();
});
