import useAlertToast from '@js/theme/components/useAlertToast';
import parseToHtml from '@js/theme/utils/parseToHtml';
import prestashop from 'prestashop';

const { danger } = useAlertToast();

const handleUpdatedEvent = () => {
  document.querySelector('body').classList.remove('cart-loading');
};

const handleUpdateEvent = async (event) => {
  prestashop.cart = event.resp.cart;

  const quickViewModal = document.querySelector(prestashop.selectors.cart.quickview);

  // TO DO REMOVE JQUERY
  $(quickViewModal).modal('hide');
  document.querySelector('body').classList.add('cart-loading');

  try {
    const resp = await prestashop.frontAPI.refreshCartPage();

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

const updateCart = () => {
  prestashop.on('updateCart', handleUpdateEvent);
  prestashop.on('updatedCart', handleUpdatedEvent);
};

export default updateCart;
