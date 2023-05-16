import $ from 'jquery';
import useAlertToast from '@js/theme/components/useAlertToast';
import sprintf from '@js/theme/utils/sprintf';
import parseToHtml from '@js/theme/utils/parseToHtml';
import prestashop from 'prestashop';
import {refreshCheckoutPage} from './common';


$(() => {
  prestashop.on('updateCart', (event) => {
    prestashop.cart = event.resp.cart;
    const getCartViewUrl = $('.js-cart').data('refresh-url');

    if (!getCartViewUrl) {
      return;
    }

    let requestData = {};

    if (event && event.reason) {
      requestData = {
        id_product_attribute: event.reason.idProductAttribute,
        id_product: event.reason.idProduct,
      };
    }

    $.post(getCartViewUrl, requestData)
      .then((resp) => {
        $(prestashop.selectors.cart.detailedTotals).replaceWith(
          resp.cart_detailed_totals,
        );
        $(prestashop.selectors.cart.summaryItemsSubtotal).replaceWith(
          resp.cart_summary_items_subtotal,
        );
        $(prestashop.selectors.cart.summarySubTotalsContainer).replaceWith(
          resp.cart_summary_subtotals_container,
        );
        $(prestashop.selectors.cart.summaryProducts).replaceWith(
          resp.cart_summary_products,
        );
        $(prestashop.selectors.cart.summaryTotals).replaceWith(
          resp.cart_summary_totals,
        );
        $(prestashop.selectors.cart.detailedActions).replaceWith(
          resp.cart_detailed_actions,
        );
        $(prestashop.selectors.cart.voucher).replaceWith(resp.cart_voucher);
        $(prestashop.selectors.cart.overview).replaceWith(resp.cart_detailed);
        $(prestashop.selectors.cart.summaryTop).replaceWith(
          resp.cart_summary_top,
        );

        $(prestashop.selectors.cart.productCustomizationId).val(0);

        $(prestashop.selectors.cart.lineProductQuantity).each(
          (index, input) => {
            const $input = $(input);
            $input.attr('value', $input.val());
          },
        );

        if ($(prestashop.selectors.checkout.cartPaymentStepRefresh).length) {
          // we get the refresh flag : on payment step we need to refresh page to be sure
          // amount is correctly updated on payment modules
          refreshCheckoutPage();
        }

        prestashop.emit('updatedCart', {eventType: 'updateCart', resp});
      })
      .fail((resp) => {
        prestashop.emit('handleError', {eventType: 'updateCart', resp});
      });
    });

  const $body = $('body');

    // REMOVE EVENT AND ADD EVENT HANDLER FORM BS5
    $body.on('click', '[data-button-action="add-to-cart"]', async (event) => {
    event.preventDefault();

    const { danger } = useAlertToast();
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

    const { danger } = useAlertToast();
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
