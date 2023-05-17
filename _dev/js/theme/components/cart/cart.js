import prestashop from 'prestashop';
import debounce from '@js/theme/utils/debounce';


prestashop.cart.active_inputs = null;

/**
 * Attach Bootstrap TouchSpin event handlers
 */
function createSpin() {
  $.each($(spinnerSelector), (index, spinner) => {
    $(spinner).TouchSpin({
      verticalupclass: 'material-icons touchspin-up',
      verticaldownclass: 'material-icons touchspin-down',
      buttondown_class: 'btn btn-touchspin js-touchspin js-increase-product-quantity',
      buttonup_class: 'btn btn-touchspin js-touchspin js-decrease-product-quantity',
      min: parseInt($(spinner).attr('min'), 10),
      max: 1000000,
    });
  });

  CheckUpdateQuantityOperations.switchErrorStat();
}


$(() => {
  const productLineInCartSelector = prestashop.themeSelectors.cart.productLineQty;


  const $body = $('body');

  function isTouchSpin(namespace) {
    return namespace === 'on.startupspin' || namespace === 'on.startdownspin';
  }

  function shouldIncreaseProductQuantity(namespace) {
    return namespace === 'on.startupspin';
  }

  function findCartLineProductQuantityInput($target) {
    const $input = $target.parents(prestashop.themeSelectors.cart.touchspin).find(productLineInCartSelector);

    if ($input.is(':focus')) {
      return null;
    }

    return $input;
  }

  function camelize(subject) {
    const actionTypeParts = subject.split('-');
    let i;
    let part;
    let camelizedSubject = '';

    for (i = 0; i < actionTypeParts.length; i += 1) {
      part = actionTypeParts[i];

      if (i !== 0) {
        part = part.substring(0, 1).toUpperCase() + part.substring(1);
      }

      camelizedSubject += part;
    }

    return camelizedSubject;
  }

  function parseCartAction($target, namespace) {
    if (!isTouchSpin(namespace)) {
      return {
        url: $target.attr('href'),
        type: camelize($target.data('link-action')),
      };
    }

    const $input = findCartLineProductQuantityInput($target);

    let cartAction = {};

    if ($input) {
      if (shouldIncreaseProductQuantity(namespace)) {
        cartAction = {
          url: $input.data('up-url'),
          type: 'increaseProductQuantity',
        };
      } else {
        cartAction = {
          url: $input.data('down-url'),
          type: 'decreaseProductQuantity',
        };
      }
    }

    return cartAction;
  }

  $(prestashop.themeSelectors.product.customizationModal).on('show.bs.modal', (modalEvent) => {
    preventCustomModalOpen(modalEvent);
  });

  function sendUpdateQuantityInCartRequest(updateQuantityInCartUrl, requestData, $target) {
    window.shouldPreventModal = true;

    return $.ajax({
      url: updateQuantityInCartUrl,
      method: 'POST',
      data: requestData,
      dataType: 'json',
    })
      .then((resp) => {
        CheckUpdateQuantityOperations.checkUpdateOperation(resp);

        $target.val(resp.quantity);
        const dataset = ($target && $target.dataset) ? $target.dataset : resp;

        // Refresh cart preview
        prestashop.emit('updateCart', {
          reason: dataset,
          resp,
        });
      })
      .fail((resp) => {
        prestashop.emit('handleError', {
          eventType: 'updateProductQuantityInCart',
          resp,
        });
      });
  }

  function getQuantityChangeType($quantity) {
    return $quantity > 0 ? 'up' : 'down';
  }

  function getRequestData(quantity) {
    return {
      ajax: '1',
      qty: Math.abs(quantity),
      action: 'update',
      op: getQuantityChangeType(quantity),
    };
  }

  function updateProductQuantityInCart(event) {
    const $target = $(event.currentTarget);
    const updateQuantityInCartUrl = $target.data('update-url');
    const baseValue = $target.attr('value');

    // There should be a valid product quantity in cart
    const targetValue = $target.val();

    /* eslint-disable */
    if (targetValue != parseInt(targetValue, 10) || targetValue < 0 || Number.isNaN(targetValue)) {
      window.shouldPreventModal = false;
      $target.val(baseValue);
      return;
    }
    /* eslint-enable */

    // There should be a new product quantity in cart
    const qty = targetValue - baseValue;

    if (qty === 0) {
      return;
    }

    if (targetValue === '0') {
      $target.closest('.product-line-actions').find('[data-link-action="delete-from-cart"]').click();
    } else {
      $target.attr('value', targetValue);
      sendUpdateQuantityInCartRequest(updateQuantityInCartUrl, getRequestData(qty), $target);
    }
  }

  // $body.on('touchspin.on.stopspin', spinnerSelector, debounce(updateProductQuantityInCart));

  // $body.on(
  //   'focusout keyup',
  //   productLineInCartSelector,
  //   (event) => {
  //     if (event.type === 'keyup') {
  //       if (event.keyCode === 13) {
  //         isUpdateOperation = true;
  //         updateProductQuantityInCart(event);
  //       }
  //
  //       return false;
  //     }
  //
  //     if (!isUpdateOperation) {
  //       updateProductQuantityInCart(event);
  //     }
  //
  //     return false;
  //   },
  // );

});
