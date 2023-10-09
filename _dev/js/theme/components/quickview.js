import prestashop from 'prestashop';
import DOMReady from '../utils/DOMReady';
import parseToHtml from '../utils/parseToHtml';

/**
 * Handle open quick view
 */
const handleQuickViewOpen = ({ resp }) => {
  const body = document.body;

  const quickviewHtml = parseToHtml(resp.quickview_html);
  body.appendChild(quickviewHtml);

  const productModal = document.getElementById(`quickview-modal-${resp.product.id}-${resp.product.id_product_attribute}`);
  productModal.classList.add('show');

  body.classList.add('js-quickview-open');

  productModal.addEventListener('hidden.bs.modal', () => {
    productModal.remove();
    body.classList.remove('js-quickview-open');
  });
};

DOMReady(() => {
  prestashop.on('clickViewOpen', handleQuickViewOpen);
});
