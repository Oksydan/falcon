import $ from 'jquery';
import prestashop from 'prestashop';


const collapsePaymentOptions = () => {
    const { additionalInformatonSelector, optionsForm } = prestashop.selectors.checkout;
    const paymentRelatedBlocks = document.querySelectorAll(`${additionalInformatonSelector}, ${optionsForm}`);

    paymentRelatedBlocks.forEach((paymentRelatedBlock) => {
        paymentRelatedBlock.classList.add('d-none');
    });
}

const getSelectedOptionId = () => {
    const selectedOption = document.querySelector('input[name="payment-option"]:checked');

    return !!selectedOption?.id ? selectedOption.id : null;
}


const getPaymentOptionSelector = (option) => {
    const paymentOption = document.querySelector(`#${option}`);
    const moduleName = paymentOption.dataset.moduleName;

    return `.js-payment-${moduleName}`;
}

const toggleConfirmation = (show = true) => {
    const { confirmationSelector } = prestashop.selectors.checkout;

    const confirmation = document.querySelector(confirmationSelector);

    if (show) {
        confirmation?.classList.remove('d-none');
    } else {
        confirmation?.classList.add('d-none');
    }
}

const haveTermsBeenAccepted = () => {
    const termsCheckbox = document.querySelectorAll(prestashop.selectors.checkout.termsCheckboxSelector);
    let checked = true;

    termsCheckbox.forEach((checkbox) => {
       if (!checkbox.checked) {
           checked = false;
       }
    });

    return checked;
}


const showNativeFormErrors = () => {
    const { termsCheckboxSelector } = prestashop.selectors.checkout;
    const formElements = document.querySelectorAll(`input[name=payment-option], ${termsCheckboxSelector}`);

    formElements.forEach((formElement) => {
        formElement.reportValidity();
    });
}

const handleOrderConfirmationErrors = ({ resp }) => {
    if (resp.cartUrl !== '') {
        location.href = resp.cartUrl;
    }
}

const areConditionsAccepted = () => {
    let accepted = true;
    const { conditionsSelector } = prestashop.selectors.checkout;
    const conditions = document.querySelectorAll(`${conditionsSelector} input[type="checkbox"]`);

    conditions.forEach((condition) => {
        if (!condition.checked) {
            accepted = false;
        }
    });

    return accepted;
}

const init = () => {
    prestashop.on('orderConfirmationErrors', handleOrderConfirmationErrors);
}

class Payment {
    constructor() {
        this.confirmationSelector = prestashop.selectors.checkout.confirmationSelector;
        this.conditionsSelector = prestashop.selectors.checkout.conditionsSelector;
        this.conditionAlertSelector = prestashop.selectors.checkout.conditionAlertSelector;
        this.termsCheckboxSelector = prestashop.selectors.checkout.termsCheckboxSelector;
    }

    init() {
        // eslint-disable-next-line no-unused-vars

        const $body = $('body');

        $body.on('change', `${this.conditionsSelector} input[type="checkbox"]`, $.proxy(this.toggleOrderButton, this));
        $body.on('change', 'input[name="payment-option"]', $.proxy(this.toggleOrderButton, this));
        // call toggle once on init to handle situation where everything
        // is already ok (like 0 price order, payment already preselected and so on)
        this.toggleOrderButton();

        $body.on('click', `${this.confirmationSelector} button`, $.proxy(this.confirm, this));

        if (!getSelectedOptionId()) {
            collapsePaymentOptions();
        }
    }

    toggleOrderButton() {
        let paymentBtnEnabled = areConditionsAccepted();

        prestashop.emit('termsUpdated', {
            isChecked: paymentBtnEnabled,
        });

        collapsePaymentOptions();

        const selectedOptionID = getSelectedOptionId();

        if (!selectedOptionID) {
            paymentBtnEnabled = false;
        }

        $(`#${selectedOptionID}-additional-information`).show();
        $(`#pay-with-${selectedOptionID}-form`).show();

        $(prestashop.selectors.checkout.paymentBinary).hide();

        if ($(`#${selectedOptionID}`).hasClass('binary')) {
            const paymentOption = getPaymentOptionSelector(selectedOptionID);
            toggleConfirmation(false);
            $(paymentOption).show();

            document.querySelectorAll(`${paymentOption} button, ${paymentOption} input`).forEach((element) => {
                if (paymentBtnEnabled) {
                    element.removeAttribute('disabled');
                } else {
                    element.setAttribute('disabled', !paymentBtnEnabled);
                }
            });

            if (paymentBtnEnabled) {
                $(paymentOption).removeClass('disabled');
            } else {
                $(paymentOption).addClass('disabled');
            }
        } else {
            toggleConfirmation(true);
            $(`${this.confirmationSelector} button`).toggleClass('disabled', !paymentBtnEnabled);
            // Next line provides backward compatibility for Classic Theme < 1.7.8
            $(`${this.confirmationSelector} button`).attr('disabled', !paymentBtnEnabled);

            if (paymentBtnEnabled) {
                $(this.conditionAlertSelector).hide();
            } else {
                $(this.conditionAlertSelector).show();
            }
        }
    }

    getPaymentOptionSelector(option) {
        const moduleName = $(`#${option}`).data('module-name');

        return `.js-payment-${moduleName}`;
    }


    async confirm() {
        const option = getSelectedOptionId();
        const termsAccepted = haveTermsBeenAccepted();

        if (option === undefined || termsAccepted === false) {
            showNativeFormErrors();
            return;
        }

        // We ask cart controller, if everything in the cart is still orderable
        const resp = await $.post(window.prestashop.urls.pages.order, {
            ajax: 1,
            action: 'checkCartStillOrderable',
        });

        // We process the information and allow other modules to intercept this
        const isRedirected = prestashop.checkout.onCheckOrderableCartResponse(resp, this);

        // If there is a redirect, we deny the form submit below, to allow the redirect to complete
        if (isRedirected) return;

        $(`${this.confirmationSelector} button`).addClass('disabled');
        $(`#pay-with-${option}-form form`).submit();
    }
}

export default function () {
    const payment = new Payment();
    payment.init();
    init();

    return payment;
}


