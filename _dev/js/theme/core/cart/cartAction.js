import prestashop from "prestashop";

const cartAction = () => {
    $('body').on('click', prestashop.themeSelectors.cart.actions, handleCartAction);
}

const parseCartAction = ($target, namespace) => {
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

const handleCartAction = (event) => {
    event.preventDefault();
    window.shouldPreventModal = true;

    const target = event.currentTarget;
    const { dataset } = event.currentTarget;

    const cartAction = parseCartAction($target, event.namespace);
    const requestData = {
        ajax: '1',
        action: 'update',
    };

    if (typeof cartAction === 'undefined') {
        return;
    }

    $.ajax({
        url: cartAction.url,
        method: 'POST',
        data: requestData,
        dataType: 'json',
        beforeSend: (jqXHR) => {
            promises.push(jqXHR);
        },
    })
        .then((resp) => {
            const $quantityInput = getTouchSpinInput($target);
            CheckUpdateQuantityOperations.checkUpdateOperation(resp);
            $quantityInput.val(resp.quantity);

            // Refresh cart preview
            prestashop.emit('updateCart', {
                reason: dataset,
                resp,
            });
        })
        .fail((resp) => {
            prestashop.emit('handleError', {
                eventType: 'updateProductInCart',
                resp,
                cartAction: cartAction.type,
            });
        });
};


export default cartAction;
