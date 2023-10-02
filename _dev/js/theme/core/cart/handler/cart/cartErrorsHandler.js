import prestashop from 'prestashop';
import cartStateStore from '../../store/cartStateStore';

const {
  setIsUpdateOperation,
  setHasError,
  setErrorMsg,
  getErrorMsg,
  getHasError,
  getIsUpdateOperation,
} = cartStateStore();

/**
 * Handles cart page errors
 * Side effects: updates cart state and cart notification DOM
 * @returns {void}
 */
const cartErrorsHandler = () => {
  const checkoutBtn = document.querySelector(prestashop.selectors.checkout.btn);
  const errorMsg = getErrorMsg();
  const hasError = getHasError();
  const isUpdateOperation = getIsUpdateOperation();
  const notification = document.querySelector(prestashop.selectors.notifications.container);

  if (document.querySelector(prestashop.selectors.notifications.dangerAlert) || (errorMsg !== '' && !hasError)) {
    checkoutBtn.classList.add('disabled');
  }

  if (errorMsg !== '') {
    const alertBlock = `
        <article class="alert alert-danger" role="alert" data-alert="danger">
          <ul class="mb-0">
            <li>${errorMsg}</li>
          </ul>
        </article>
      `;

    if (notification) {
      notification.innerHTML = alertBlock;
    }

    setErrorMsg('');
    setIsUpdateOperation(false);

    if (hasError) {
      // if hasError is true, quantity was not updated : allow checkout
      checkoutBtn.classList.remove('disabled');
    }
  } else if (!hasError && isUpdateOperation) {
    setHasError(false);
    setIsUpdateOperation(false);

    if (notification) {
      notification.innerHTML = '';
    }

    checkoutBtn.classList.remove('disabled');
  }
};

export default cartErrorsHandler;
