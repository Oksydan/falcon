import $ from 'jquery';
import prestashop from 'prestashop';

const handleQuickView = (event) => {
    event.preventDefault();
    const miniature = event.target.closest(prestashop.selectors.product.miniature);
    const dataset = miniature?.dataset || {};

    prestashop.emit('clickQuickView', {
        dataset,
    });
}

const productQuickView = () => {
    // TO MOVE TO BS EVENT HANDLER
    $('body').on('click', prestashop.selectors.listing.quickview, handleQuickView);
}

export default productQuickView;
