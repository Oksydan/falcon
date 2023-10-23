import prestashop from 'prestashop';
import { parseToHtml } from '../../../../../utils/DOM/DOMHelpers';
import updateCartContentRequest from '../../request/cart/updateCartContentRequest';

/**
 * Handles the update of the cart content and emits the 'updatedCart' event.
 * @param {object} event - The update cart event object.
 * @param {object} event.resp - The response object containing updated cart data.
 * @throws {Error} Will throw an error if an error occurs during the cart update process.
 * @returns {Promise<void>} - A Promise that resolves once the cart update process is complete.
 */
const updateCartHandler = async (event) => {
  prestashop.cart = event.resp.cart;
  document.querySelector('body').classList.add('cart-loading');
  const { getRequest } = updateCartContentRequest();

  try {
    const resp = await getRequest();

    document.querySelector(prestashop.selectors.cart.detailedTotals)
      ?.replaceWith(parseToHtml(resp.cart_detailed_totals));
    document.querySelector(prestashop.selectors.cart.summaryItemsSubtotal)
      ?.replaceWith(parseToHtml(resp.cart_summary_items_subtotal));
    document.querySelector(prestashop.selectors.cart.summarySubTotalsContainer)
      ?.replaceWith(parseToHtml(resp.cart_summary_subtotals_container));
    document.querySelector(prestashop.selectors.cart.summaryProducts)
      ?.replaceWith(parseToHtml(resp.cart_summary_products));
    document.querySelector(prestashop.selectors.cart.summaryTotals)
      ?.replaceWith(parseToHtml(resp.cart_summary_totals));
    document.querySelector(prestashop.selectors.cart.detailedActions)
      ?.replaceWith(parseToHtml(resp.cart_detailed_actions));
    document.querySelector(prestashop.selectors.cart.voucher)
      ?.replaceWith(parseToHtml(resp.cart_voucher));
    document.querySelector(prestashop.selectors.cart.overview)
      ?.replaceWith(parseToHtml(resp.cart_detailed));
    document.querySelector(prestashop.selectors.cart.summaryTop)
      ?.replaceWith(parseToHtml(resp.cart_summary_top));

    prestashop.emit('updatedCart', { eventType: 'updateCart', resp });
  } catch (error) {
    prestashop.emit('handleError', {
      eventType: 'updateCart',
      resp: {},
      error,
    });
  }
};

export default updateCartHandler;
