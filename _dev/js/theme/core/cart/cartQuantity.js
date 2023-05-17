import useCustomQuantityInput from "@js/theme/components/useCustomQuantityInput";
import useAlertToast from "@js/theme/components/useAlertToast";
import prestashop from "prestashop";

prestashop.cart = prestashop.cart || {};

let errorMsg = '';
let isUpdateOperation = false;
let hasError = false;

const { danger } = useAlertToast();

const cartQuantity = () => {
    prestashop.on('updatedCart', () => {
        window.shouldPreventModal = false;

        $(prestashop.themeSelectors.product.customizationModal).on('show.bs.modal', (modalEvent) => {
            preventCustomModalOpen(modalEvent);
        });

        createSpinner();
    });

    createSpinner();
}

const preventCustomModalOpen = (event) => {
    if (window.shouldPreventModal) {
        event.preventDefault();

        return false;
    }

    return true;
};


const CheckUpdateQuantityOperations = {
    switchErrorStat: () => {
        /**
         * if errorMsg is not empty or if notifications are shown, we have error to display
         * if hasError is true, quantity was not updated : we don't disable checkout button
         */
        const $checkoutBtn = $(prestashop.themeSelectors.checkout.btn);

        if ($(prestashop.themeSelectors.notifications.dangerAlert).length || (errorMsg !== '' && !hasError)) {
            $checkoutBtn.addClass('disabled');
        }

        if (errorMsg !== '') {
            const strError = `
        <article class="alert alert-danger" role="alert" data-alert="danger">
          <ul class="mb-0">
            <li>${errorMsg}</li>
          </ul>
        </article>
      `;
            $(prestashop.themeSelectors.notifications.container).html(strError);
            errorMsg = '';
            isUpdateOperation = false;
            if (hasError) {
                // if hasError is true, quantity was not updated : allow checkout
                $checkoutBtn.removeClass('disabled');
            }
        } else if (!hasError && isUpdateOperation) {
            hasError = false;
            isUpdateOperation = false;
            $(prestashop.themeSelectors.notifications.container).html('');
            $checkoutBtn.removeClass('disabled');
        }
    },
    checkUpdateOperation: (resp) => {
        /**
         * resp.hasError can be not defined but resp.errors not empty: quantity is updated but order cannot be placed
         * when resp.hasError=true, quantity is not updated
         */
        const { hasError: hasErrorOccurred, errors: errorData } = resp;
        hasError = hasErrorOccurred ?? false;
        const errors = errorData ?? '';

        // 1.7.2.x returns errors as string, 1.7.3.x returns array
        if (errors instanceof Array) {
            errorMsg = errors.join(' ');
        } else {
            errorMsg = errors;
        }

        isUpdateOperation = true;
    },
};

const handleQuantityChange = async ({ operation, qtyDifference, input}) => {
    const { dataset } = input;
    const { productAttributeId, productId, customizationId } = dataset;

    const simpleOperation = operation === 'decrease' ? 'down' : 'up';

    document.querySelector('body').classList.add('cart-loading');

    try {
        const resp = await prestashop.frontAPI.updateCartQuantity(simpleOperation, productId, productAttributeId, qtyDifference, customizationId);
        CheckUpdateQuantityOperations.checkUpdateOperation(resp);

        if (!resp.hasError) {
            prestashop.emit('updateCart', {
                reason: dataset || resp,
                resp,
            });
        } else {
            prestashop.emit('handleError', {
                eventType: 'updateProductQuantityInCart',
                resp,
            });
        }
    } catch (error) {
        danger(error.message);
    }

    document.querySelector('body').classList.remove('cart-loading');
}

const createSpinner = () => {
    const spinners = document.querySelectorAll('.js-custom-cart-qty-spinner');

    spinners.forEach((spinner) => {
        const { init, getDOMElements } = useCustomQuantityInput(spinner, {
            onQuantityChange: ({ qty, operation, qtyDifference, startValue }) => {
                const { input } = getDOMElements();

                handleQuantityChange({ operation, qtyDifference, input});
            }
        });

        init();
    });

    CheckUpdateQuantityOperations.switchErrorStat();
}

export default cartQuantity;
