import prestashop from 'prestashop';
import useEvent from '@js/theme/components/event/useEvent';

const { on } = useEvent();

const handleQuickView = (event) => {
  event.preventDefault();
  const miniature = event.target.closest(prestashop.selectors.product.miniature);
  const dataset = miniature?.dataset || {};

  prestashop.emit('clickQuickView', {
    dataset,
  });
};

const productQuickView = () => {
  on(document, 'click', prestashop.selectors.listing.quickview, handleQuickView);
};

export default productQuickView;
