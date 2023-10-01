import $ from 'jquery';
import prestashop from 'prestashop';
import DOMReady from '../utils/DOMReady';
import parseToHtml from '../utils/parseToHtml';

/**
 * Handle open quick view
 */
const handleQuickViewOpen = ({
  resp,
}) => {
  const body = document.querySelector('body');
  body.append(parseToHtml(resp.quickview_html));

  // TO DO REMOVE JQUERY
  const productModal = $(
    `#quickview-modal-${resp.product.id}-${resp.product.id_product_attribute}`,
  );
  productModal.modal('show');

  body.classList.add('js-quickview-open');

  productModal.on('hidden.bs.modal', () => {
    productModal.remove();
    body.classList.remove('js-quickview-open')
  });
};

DOMReady(() => {
  prestashop.on('clickViewOpen', handleQuickViewOpen);
});
