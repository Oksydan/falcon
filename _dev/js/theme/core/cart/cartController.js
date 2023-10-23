import prestashop from 'prestashop';
import useEvent from '../../../utils/event/useEvent';
import submitVoucherHandler from './handler/voucher/submitVoucherHandler';
import codeLinkSubmitHandler from './handler/voucher/codeLinkSubmitHandler';
import deleteVoucherHandler from './handler/voucher/deleteVoucherHandler';
import addToCartHandler from './handler/cart/addToCartHandler';
import deleteFromCartHandler from './handler/cart/deleteFromCartHandler';
import quantityChangeHandler from './handler/cart/quantityChangeHandler';
import updateCartHandler from './handler/cart/updateCartHandler';
import updatedCartHandler from './handler/cart/updatedCartHandler';
import cartErrorsHandler from './handler/cart/cartErrorsHandler';
import useCustomQuantityInput from '../../components/useCustomQuantityInput';

const { on } = useEvent();

/**
 * The Cart Controller manages interactions and events related to the shopping cart.
 * @namespace cartController
 * @returns {object} Returns an object with an `init` function to initialize the cart controller.
 * @property {function} init - Initializes the cart controller by attaching event handlers to relevant DOM elements.
 * @public
 */
const cartController = () => {
  /**
   * Attaches spinner events to custom cart quantity spinners.
   * @private
   * @function
   */
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

  /**
   * Initializes the cart controller by attaching event handlers to relevant DOM elements.
   * @public
   * @function
   * @memberof cartController
   */
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
      cartErrorsHandler();
    });

    prestashop.on('updateCart', (event) => {
      updateCartHandler(event);
    });

    cartErrorsHandler();
  };

  return {
    init,
  };
};

export default cartController;
