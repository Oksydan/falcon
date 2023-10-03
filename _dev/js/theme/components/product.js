import $ from 'jquery';
import prestashop from 'prestashop';
import useCustomQuantityInput from './useCustomQuantityInput';
import { each } from '../utils/DOMHelpers';
import productEventContextSelector from "../core/product/utils/productEventContextSelector";

$(() => {
  const createInputFile = () => {
    $('.js-file-input').on('change', (event) => {
      const target = $(event.currentTarget)[0];
      const file = (target) ? target.files[0] : null;

      if (target && file) {
        $(target).prev().text(file.name);
      }
    });
  };

  const initProductQuantityInput = () => {
    const initQtySpinner = (spinner) => {
      const { init } = useCustomQuantityInput(spinner, {
        onQuantityChange: (event) => {
          prestashop.emit('updateProduct', {
            eventType: 'updatedProductQuantity',
            event,
          });
        },
      });

      init();
    };

    each(`${productEventContextSelector()} .js-product-qty-spinner`, initQtySpinner);
  };

  initProductQuantityInput();
  createInputFile();
  let updateEvenType = false;

  prestashop.on('updateProduct', ({ eventType }) => {
    updateEvenType = eventType;
  });

  prestashop.on('updateCart', (event) => {
    if (
      prestashop.page.page_name === 'product'
      && parseInt(event.reason.idProduct, 10) === parseInt($('#add-to-cart-or-refresh').find('[name="id_product"]').val(), 10)) {
      prestashop.emit('updateProduct', {
        event,
        resp: {},
        reason: {
          productUrl: prestashop.urls.pages.product || '',
        },
      });
    }
  });

  prestashop.on('updatedProduct', (event) => {
    createInputFile();
    const contextSelector = productEventContextSelector();

    if (updateEvenType === 'updatedProductCombination') {
      $(`${contextSelector} .js-product-images`).replaceWith(event.product_cover_thumbnails);
      $(`${contextSelector} .js-product-images-modal`).replaceWith(event.product_images_modal);
      prestashop.emit('updatedProductCombination', event);
    }

    updateEvenType = false;

    prestashop.pageLazyLoad.update();
    initProductQuantityInput();
  });
});
