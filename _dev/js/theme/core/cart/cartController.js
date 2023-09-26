import prestashop from 'prestashop';
import useEvent from '../../components/event/useEvent';
import submitVoucherHandler from './handler/voucher/submitVoucherHandler';
import codeLinkSubmitHandler from './handler/voucher/codeLinkSubmitHandler';
import deleteVoucherHandler from './handler/voucher/deleteVoucherHandler';
import addToCartHandler from './handler/cart/addToCartHandler';
import deleteFromCartHandler from './handler/cart/deleteFromCartHandler';
import quantityChangeHandler from './handler/cart/quantityChangeHandler';
import updateCartHandler from './handler/cart/updateCartHandler';
import updatedCartHandler from './handler/cart/updatedCartHandler';
import useCustomQuantityInput from '../../components/useCustomQuantityInput';

const { on } = useEvent();

/**
 * Cart controller
 * @returns {object} return
 * @returns {function} return.init initialize cart controller
 */
const cartController = () => {
  const attachSpinnerEvents = () => {
    const spinners = document.querySelectorAll('.js-custom-cart-qty-spinner');

    spinners.forEach((spinner) => {
      const { init, getDOMElements } = useCustomQuantityInput(spinner, {
        onQuantityChange: ({ operation, qtyDifference }) => {
          const { input } = getDOMElements();

          quantityChangeHandler(operation, qtyDifference, input);
        },
      });

      init();
    });
  };

  const init = () => {
    const {
      discountCode,
    } = prestashop.selectors.cart;

    on(document, 'submit', '.js-voucher-form', submitVoucherHandler);
    on(document, 'click', discountCode, codeLinkSubmitHandler);
    on(document, 'click', '.js-voucher-delete', deleteVoucherHandler);
    on(document, 'click', '[data-button-action="add-to-cart"]', addToCartHandler);
    on(document, 'click', '.js-remove-from-cart', deleteFromCartHandler);

    attachSpinnerEvents();

    prestashop.on('updatedCart', (event) => {
      attachSpinnerEvents();
      updatedCartHandler(event);
    });

    prestashop.on('updateCart', (event) => {
      updateCartHandler(event);
    });
  };

  return {
    init,
  };
};

export default cartController;
