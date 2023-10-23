import prestashop from 'prestashop';
import useCustomQuantityInput from './useCustomQuantityInput';
import { each, parseToHtml, DOMReady } from '../../utils/DOM/DOMHelpers';
import productEventContextSelector from '../core/product/utils/productEventContextSelector';

DOMReady(() => {
  const createInputFile = () => {
    each('.js-file-input', (input) => {
      input.addEventListener('change', (event) => {
        const target = event.delegateTarget;
        const file = (target) ? target.files[0] : null;

        if (target && file) {
          target.previousElementSibling.textContent = file.name;
        }
      });
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
    const productForm = document.getElementById('add-to-cart-or-refresh');
    const idProduct = productForm ? parseInt(productForm.querySelector('[name="id_product"]').value, 10) : null;

    if (prestashop.page.page_name === 'product' && parseInt(event.reason.idProduct, 10) === idProduct) {
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
      const productImages = document.querySelector(`${contextSelector} .js-product-images`);
      const productImagesModal = document.querySelector(`${contextSelector} .js-product-images-modal`);

      if (productImages) {
        productImages.replaceWith(parseToHtml(event.product_cover_thumbnails));
      }

      if (productImagesModal) {
        productImagesModal.replaceWith(parseToHtml(event.product_images_modal));
      }

      prestashop.emit('updatedProductCombination', event);
    }

    updateEvenType = false;

    prestashop.pageLazyLoad.update();
    initProductQuantityInput();
  });
});
