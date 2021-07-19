/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 */
import $ from 'jquery';
import prestashop from 'prestashop';

$(() => {
  createProductSpin();
  createInputFile();
  let updateEvenType = false;

  prestashop.on('updateProduct', ({eventType}) => {
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

  function createInputFile() {
    $('.js-file-input').on('change', (event) => {
      const target = event.currentTarget;
      const file = target.files[0];

      if (target && file) {
        $(target).prev().text(file.name);
      }
    });
  }

  function createProductSpin() {
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
  }
});
