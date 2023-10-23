import prestashop from 'prestashop';
import { DOMReady, parseToHtml } from '../../utils/DOM/DOMHelpers';

/**
 * Handle open quick view
 */
const handleQuickViewOpen = ({ resp }) => {
  const { body } = document;

  const quickviewHtml = parseToHtml(resp.quickview_html);
  body.appendChild(quickviewHtml);

  const productModal = document.getElementById(`quickview-modal-${resp.product.id}-${resp.product.id_product_attribute}`);
  productModal.classList.add('show');

  body.classList.add('js-quickview-open');

  const modalInstance = new window.bootstrap.Modal(productModal);
  modalInstance.show();

  productModal.addEventListener('hidden.bs.modal', () => {
    productModal.remove();
    body.classList.remove('js-quickview-open');
  });
};

DOMReady(() => {
  prestashop.on('clickViewOpen', handleQuickViewOpen);
});
