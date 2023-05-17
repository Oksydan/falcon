import useAlertToast from '@js/theme/components/useAlertToast';
import parseToHtml from '@js/theme/utils/parseToHtml';
import prestashop from "prestashop";

const { danger } = useAlertToast();

const cartVouchers = () => {
    // REMOVE EVENT FROM JQUERY AND ADD EVENT HANDLER FORM BS5 - DELEGATION IS NEEDED
    $('body').on('submit', '.js-voucher-form', formEventHandler);
    $('body').on('click', prestashop.themeSelectors.cart.discountCode, linkEventHandler);
    $('body').on('click', '.js-voucher-delete', deleteHandler);
}

const deleteHandler = async (event) => {
    event.preventDefault();

    const btn = event.currentTarget;
    const { dataset } = btn;
    const { idDiscount } = dataset;

    try {
        const resp = await prestashop.frontAPI.deleteVoucherFromCart(idDiscount);

        if (!resp.hasError) {
            prestashop.emit('updateCart', {
                reason: dataset || resp,
                resp,
            });
        } else {
            prestashop.emit('handleError', {
                eventType: 'deleteVoucherFromCart',
                resp,
            });
        }
    } catch (error) {
        danger(error.message);
    }
}

const linkEventHandler = (event) => {
    event.preventDefault();

    const link = event.currentTarget;
    const input = document.querySelector('[name="discount_name"]');
    const form = input?.closest('.js-voucher-form');

    if (input && form) {
        const event = new Event('submit', {
            'bubbles': true,
            'cancelable': true,
        });

        input.value = link.textContent;
        form.dispatchEvent(event);
    }
}

const formEventHandler = async (event) => {
    event.preventDefault();

    const addVoucherForm = event.currentTarget;
    const btn = addVoucherForm.querySelector('[type="submit"]');
    const input = addVoucherForm.querySelector('[name="discount_name"]');
    const voucherName = input?.value || '';

    btn.disabled = true;

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
                alertText.textContent = '';
                alertText.append(parseToHtml(errors.join('')));
            }
        }
    } catch (error) {
        danger(error.message);
    }

    btn.disabled = false;
};

export default cartVouchers;
