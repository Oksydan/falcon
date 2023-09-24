import useAlertToast from '@js/theme/components/useAlertToast';
import prestashop from 'prestashop';

let errorMsg = '';
let isUpdateOperation = false;
let hasError = false;

const { danger } = useAlertToast();

const switchErrorStat = () => {
  const checkoutButtons = document.querySelectorAll(prestashop.selectors.checkout.btn);

  const toggleDisabledState = (disabled) => {
    checkoutButtons.forEach((btn) => {
      btn.disabled = disabled;
    });
  };

  if (document.querySelector(prestashop.selectors.notifications.dangerAlert) || (errorMsg !== '' && !hasError)) {
    toggleDisabledState(true);
  }

  if (errorMsg !== '') {
    danger(errorMsg);
    errorMsg = '';
    isUpdateOperation = false;

    if (hasError) {
      // if hasError is true, quantity was not updated : allow checkout
      toggleDisabledState(false);
    }
  } else if (!hasError && isUpdateOperation) {
    hasError = false;
    isUpdateOperation = false;
    toggleDisabledState(false);
  }
};

const handleErrors = () => {
  switchErrorStat();
};

const cartQuantity = () => {
  prestashop.on('updatedCart', () => {
    handleErrors();
  });

  handleErrors();
};

export default cartQuantity;
