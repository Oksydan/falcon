import useCustomQuantityInput from '@js/theme/components/useCustomQuantityInput';
import useAlertToast from '@js/theme/components/useAlertToast';
import prestashop from 'prestashop';

prestashop.cart = prestashop.cart || {};

let errorMsg = '';
let isUpdateOperation = false;
let hasError = false;

const { danger } = useAlertToast();

const checkUpdateOperation = (resp) => {
  const { hasError: hasErrorOccurred, errors: errorData } = resp;
  hasError = hasErrorOccurred ?? false;
  errorMsg = errorData ?? '';

  isUpdateOperation = true;
};

const handleQuantityChange = async ({ operation, qtyDifference, input }) => {
  const { dataset } = input;
  const { productAttributeId, productId, customizationId } = dataset;

  const simpleOperation = operation === 'decrease' ? 'down' : 'up';

  document.querySelector('body').classList.add('cart-loading');

  try {
    const resp = await prestashop.frontAPI.updateCartQuantity(
      simpleOperation,
      productId,
      productAttributeId,
      qtyDifference,
      customizationId,
    );

    checkUpdateOperation(resp);

    if (!resp.hasError) {
      prestashop.emit('updateCart', {
        reason: dataset || resp,
        resp,
      });
    } else {
      prestashop.emit('handleError', {
        eventType: 'updateProductQuantityInCart',
        resp,
      });
    }
  } catch (error) {
    danger(error.message);
  }

  document.querySelector('body').classList.remove('cart-loading');
};

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

const createSpinner = () => {
  const spinners = document.querySelectorAll('.js-custom-cart-qty-spinner');

  spinners.forEach((spinner) => {
    const { init, getDOMElements } = useCustomQuantityInput(spinner, {
      onQuantityChange: ({
        operation, qtyDifference,
      }) => {
        const { input } = getDOMElements();

        handleQuantityChange({ operation, qtyDifference, input });
      },
    });

    init();
  });

  switchErrorStat();
};

const cartQuantity = () => {
  prestashop.on('updatedCart', () => {
    createSpinner();
  });

  createSpinner();
};

export default cartQuantity;
