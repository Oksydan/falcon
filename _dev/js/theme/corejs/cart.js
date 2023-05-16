import $ from 'jquery';
import useAlertToast from '@js/theme/components/useAlertToast';
import sprintf from '@js/theme/utils/sprintf';
import parseToHtml from '@js/theme/utils/parseToHtml';
import prestashop from 'prestashop';

$(() => {
    const { danger } = useAlertToast();

  prestashop.on('updateCart', async (event) => {
    prestashop.cart = event.resp.cart;

    if (prestashop.page.page_name !== 'cart') {
        return;
    }

      try {
          const resp = await prestashop.frontAPI.refreshCartPage();

          document.querySelector(prestashop.selectors.cart.detailedTotals)?.replaceWith(parseToHtml(resp.cart_detailed_totals));
          document.querySelector(prestashop.selectors.cart.summaryItemsSubtotal)?.replaceWith(parseToHtml(resp.cart_summary_items_subtotal));
          document.querySelector(prestashop.selectors.cart.summarySubTotalsContainer)?.replaceWith(parseToHtml(resp.cart_summary_subtotals_container));
          document.querySelector(prestashop.selectors.cart.summaryProducts)?.replaceWith(parseToHtml(resp.cart_summary_products));
          document.querySelector(prestashop.selectors.cart.summaryTotals)?.replaceWith(parseToHtml(resp.cart_summary_totals));
          document.querySelector(prestashop.selectors.cart.detailedActions)?.replaceWith(parseToHtml(resp.cart_detailed_actions));
          document.querySelector(prestashop.selectors.cart.voucher)?.replaceWith(parseToHtml(resp.cart_voucher));
          document.querySelector(prestashop.selectors.cart.overview)?.replaceWith(parseToHtml(resp.cart_detailed));
          document.querySelector(prestashop.selectors.cart.summaryTop)?.replaceWith(parseToHtml(resp.cart_summary_top));

          prestashop.emit('updatedCart', {eventType: 'updateCart', resp});
      } catch (error) {
          danger(error.message);
      }
    });


  const $body = $('body');

    // REMOVE EVENT AND ADD EVENT HANDLER FORM BS5
    $body.on('click', '[data-button-action="add-to-cart"]', async (event) => {
    event.preventDefault();

    const form = event.currentTarget?.form;
    const addToCartButton = event.currentTarget;

    addToCartButton.setAttribute('disabled', true);

    const isQuantityInputValid = (input) => {
      let validInput = true;

      const minimalValue = parseInt((input?.getAttribute('min') || 0), 10);

      if (minimalValue && input.value < minimalValue) {
          validInput = false;
      }

      return validInput;
    };

    const idProduct = form.querySelector('[name=id_product]').value;
    const quantityInput = form.querySelector('[name=qty]');
    const quantity = quantityInput?.value || 0;
    const idProductAttribute = form.querySelector('[name=id_product_attribute]')?.value || 0;
    const idCustomization = form.querySelector('[name=id_customization]')?.value || 0;

    const onInvalidQuantity = (input) => {
        danger(sprintf(prestashop.t.alert.minimalQuantity, input.getAttribute('min')));
    };

    if (quantityInput && !isQuantityInputValid(quantityInput)) {
        onInvalidQuantity(quantityInput);
        addToCartButton.removeAttribute('disabled');

        return;
    }

    try {
        const resp = await prestashop.frontAPI.addToCart(idProduct, quantity, idProductAttribute, idCustomization);

        if (!resp.hasError) {
            prestashop.emit('updateCart', {
                reason: {
                    idProduct: resp.id_product,
                    idProductAttribute: resp.id_product_attribute,
                    idCustomization: resp.id_customization,
                    linkAction: 'add-to-cart',
                    cart: resp.cart,
                },
                resp,
            });
        } else {
            prestashop.emit('handleError', {
                eventType: 'addProductToCart',
                resp,
            });
        }
    } catch (error) {
        danger(error.message);
    }

    setTimeout(() => {
      addToCartButton.removeAttribute('disabled');
    }, 1000);
  });

  // REMOVE EVENT AND ADD EVENT HANDLER FORM BS5
  $body.on('submit', '[data-link-action="add-voucher"]', async (event) => {
    event.preventDefault();

    const addVoucherForm = event.currentTarget;
    const input = addVoucherForm.querySelector('[name="discount_name"]');
    const voucherName = input?.value || '';

    try {
      const resp = await prestashop.frontAPI.addVoucherToCart(voucherName);

      if (!resp.hasError) {
        prestashop.emit('updateCart', {
          reason: event.target.dataset,
          resp,
        });
      } else {
        const alert = document.querySelector('.js-voucher-error');
        const alertText = alert.querySelector('.js-voucher-error-text');

        if (alert && alertText && resp.errors?.length) {
            const errors = resp.errors.map((error) => `<div>${error}</div>`);

            alert.style.display = 'block';
            alertText.append(parseToHtml(errors.join('')));
        }
      }
    } catch (error) {
      danger(error.message);
    }
  });
});
