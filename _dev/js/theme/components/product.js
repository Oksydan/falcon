import $ from 'jquery';
import prestashop from 'prestashop';

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

  const createProductSpin = () => {
    const $quantityInput = $('#quantity_wanted');

    $quantityInput.TouchSpin({
      verticalupclass: 'material-icons touchspin-up',
      verticaldownclass: 'material-icons touchspin-down',
      buttondown_class: 'btn btn-touchspin js-touchspin',
      buttonup_class: 'btn btn-touchspin js-touchspin',
      min: parseInt($quantityInput.attr('min'), 10),
      max: 1000000,
    });

    $quantityInput.on('focusout', () => {
      if ($quantityInput.val() === '' || $quantityInput.val() < $quantityInput.attr('min')) {
        $quantityInput.val($quantityInput.attr('min'));
        $quantityInput.trigger('change');
      }
    });

    $('body').on('change keyup', '#quantity_wanted', (event) => {
      $(event.currentTarget).trigger('touchspin.stopspin');
      prestashop.emit('updateProduct', {
        eventType: 'updatedProductQuantity',
        event,
      });
    });
  };

  createProductSpin();
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

    if (event && event.product_minimal_quantity) {
      const minimalProductQuantity = parseInt(event.product_minimal_quantity, 10);
      const quantityInputSelector = '#quantity_wanted';
      const quantityInput = $(quantityInputSelector);

      // @see http://www.virtuosoft.eu/code/bootstrap-touchspin/ about Bootstrap TouchSpin
      quantityInput.trigger('touchspin.updatesettings', {
        min: minimalProductQuantity,
      });
    }

    if (updateEvenType === 'updatedProductCombination') {
      $('.js-product-images').replaceWith(event.product_cover_thumbnails);
      $('.js-product-images-modal').replaceWith(event.product_images_modal);
      prestashop.emit('updatedProductCombination', event);
    }

    updateEvenType = false;

    prestashop.pageLazyLoad.update();
  });
});
