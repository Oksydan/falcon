import prestashop from 'prestashop';
import useDefaultHttpRequest from '../../../../../utils/http/useDefaultHttpRequest';

/**
 * @typedef {object} ServerResponse
 * @property {string} cart_detailed - Cart detailed HTML used in the cart page.
 * @property {string} cart_detailed_actions - Cart actions HTML used in the cart page.
 * @property {string} cart_detailed_totals - Cart totals HTML used in the cart page.
 * @property {string} cart_summary_items_subtotal - Cart summary items subtotal HTML used in the checkout page.
 * @property {string} cart_summary_products - Cart summary products HTML used in the checkout page.
 * @property {string} cart_summary_subtotals_container - Cart summary products HTML used in the checkout page.
 * @property {string} cart_summary_top - Cart summary top HTML used in the checkout page.
 * @property {string} cart_summary_totals - Cart summary totals HTML used in the checkout page.
 * @property {string} cart_voucher - Cart voucher HTML used in the checkout page.
 */

/**
 * Creates a request object for updating the content of the cart.
 * @example
 * const { getRequest } = updateCartContentRequest();
 *
 * try {
 *   const resp = await getRequest();
 * } catch (error) {
 *   console.error(error);
 * }
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const updateCartContentRequest = () => {
  const payloadToSend = {
    action: 'refresh',
    ajax: 1,
  };

  const getRequest = () => useDefaultHttpRequest(prestashop.urls.pages.cart, payloadToSend);

  return {
    getRequest,
  };
};

export default updateCartContentRequest;
