import $ from 'jquery';
import prestashop from 'prestashop';
import checkCartStillOrderableRequest from '@js/theme/core/checkout/request/checkCartStillOrderableRequest';


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

const toggleOrderButton = () => {
    const { confirmationSelector, paymentBinary, conditionAlertSelector } = prestashop.selectors.checkout;

    let paymentBtnEnabled = areConditionsAccepted();

    prestashop.emit('termsUpdated', {
        isChecked: paymentBtnEnabled,
    });

    collapsePaymentOptions();

    const selectedOptionID = getSelectedOptionId();

    if (!selectedOptionID) {
        paymentBtnEnabled = false;
    }

    document.querySelectorAll(`#${selectedOptionID}-additional-information, #pay-with-${selectedOptionID}-form`)
        .forEach((element) => {
            element.classList.remove('d-none');
        });

    document.querySelectorAll(paymentBinary)
        .forEach((element) => {
            element.classList.add('d-none');
        });

    if (document.querySelector(`#${selectedOptionID}`)?.classList.contains('binary')) {
        const paymentOptionSelector = getPaymentOptionSelector(selectedOptionID);
        toggleConfirmation(false);

        document.querySelectorAll(paymentOptionSelector)
            .forEach((element) => {
                element.classList.remove('d-none');
            });

        document.querySelectorAll(`${paymentOptionSelector} button, ${paymentOptionSelector} input`).forEach((element) => {
            if (paymentBtnEnabled) {
                element.removeAttribute('disabled');
            } else {
                element.setAttribute('disabled', 'disabled');
            }
        });
    } else {
        toggleConfirmation(true);

        document.querySelectorAll(`${confirmationSelector} button`).forEach((element) => {
            element.classList.toggle('disabled', !paymentBtnEnabled);
        });

        document.querySelectorAll(conditionAlertSelector).forEach((element) => {
            element.classList.toggle('d-none', paymentBtnEnabled);
        });
    }
}

const confirm = async () => {
    const { confirmationSelector } = prestashop.selectors.checkout;
    const option = getSelectedOptionId();
    const termsAccepted = haveTermsBeenAccepted();

    if (option === undefined || termsAccepted === false) {
        showNativeFormErrors();
        return;
    }

    // We ask cart controller, if everything in the cart is still orderable
    const { getRequest } = checkCartStillOrderableRequest(window.prestashop.urls.pages.order);

    const resp = await getRequest();

    // We process the information and allow other modules to intercept this
    const isRedirected = prestashop.checkout.onCheckOrderableCartResponse(resp);

    // If there is a redirect, we deny the form submit below, to allow the redirect to complete
    if (isRedirected) return;

    document.querySelectorAll(`${confirmationSelector} button`).forEach((element) => {
        element.classList.add('disabled');
    });

    document.querySelector(`#pay-with-${option}-form form`)?.submit();
}


const init = () => {
    prestashop.on('orderConfirmationErrors', handleOrderConfirmationErrors);

    const { conditionsSelector, confirmationSelector } = prestashop.selectors.checkout;


    const $body = $('body');

    // REMOVE EVENT FROM JQUERY AND ADD EVENT HANDLER FORM BS5 - DELEGATION IS NEEDED
    $body.on('change', `${conditionsSelector} input[type="checkbox"]`, toggleOrderButton);
    // REMOVE EVENT FROM JQUERY AND ADD EVENT HANDLER FORM BS5 - DELEGATION IS NEEDED
    $body.on('change', 'input[name="payment-option"]', toggleOrderButton);
    // call toggle once on init to handle situation where everything
    // is already ok (like 0 price order, payment already preselected and so on)
    toggleOrderButton();

    // REMOVE EVENT FROM JQUERY AND ADD EVENT HANDLER FORM BS5 - DELEGATION IS NEEDED
    $body.on('click', `${confirmationSelector} button`, confirm);

    if (!getSelectedOptionId()) {
        collapsePaymentOptions();
    }
}

const checkoutPayment = () => {
    init();
}

export default checkoutPayment;


