import prestashop from 'prestashop';
import useDefaultHttpRequest from '../../../../components/http/useDefaultHttpRequest';
/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string} cart_detailed - cart detailed html used in cart page
 * @property {string} cart_detailed_actions - cart actions html used in cart page
 * @property {string} cart_detailed_totals - cart totals html used in cart page
 * @property {string} cart_summary_items_subtotal - cart summary items subtotal html used in checkout page
 * @property {string} cart_summary_products - cart summary products html used in checkout page
 * @property {string} cart_summary_subtotals_container - cart summary products html used in checkout page
 * @property {string} cart_summary_top - cart summary top html used in checkout page
 * @property {string} cart_summary_totals - cart summary totals html used in checkout page
 * @property {string} cart_voucher - cart voucher html used in checkout page
 */

/**
 * Add voucher to cart request
 * @example
 *  const { getRequest } = updateCartContentRequest();
 *
 *  try {
 *    const resp = await getRequest();
 *  } catch (error) {
 *    console.error(error);
 *  }
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
