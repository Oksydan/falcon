import prestashop from 'prestashop';
import parseToHtml from '../../../../utils/parseToHtml';
import useAlertToast from '../../../../components/useAlertToast';
import updateCartContentRequest from '../../request/cart/updateCartContentRequest';

const { danger } = useAlertToast();

/**
 * Update cart handler - update cart content and emit updatedCart event
 * @param {object} event - update cart event object
 * @returns {Promise<void>}
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
    danger(error.message);
  }
};

export default updateCartHandler;
