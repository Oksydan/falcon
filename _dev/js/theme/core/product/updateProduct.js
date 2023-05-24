import prestashop from 'prestashop';
import { fromSerializeObject } from '@js/theme/utils/formSerialize';
import parseToHtml from '@js/theme/utils/parseToHtml';
import useAlertToast from '@js/theme/components/useAlertToast';
import $ from "jquery";

const { danger } = useAlertToast();

// Used to clearTimeout if user flood the product quantity input
let currentRequestDelayedId = null;

// Check for popState event
let isOnPopStateEvent = false;

// Register form of first update
const firstFormData = [];

// Detect if the form has changed one time
let formChanged = false;

const isQuickViewOpen = () => !!document.querySelector('.modal.quickview.in');

const replaceDOMElements = ({
                                product_cover_thumbnails,
                                product_prices,
                                product_customization,
                                product_variants,
                                product_discounts,
                                product_additional_info,
                                product_details,
                                product_flags,
                            }) => {
    document.querySelector(prestashop.selectors.product.imageContainer)
        ?.replaceWith(parseToHtml(product_cover_thumbnails));

    document.querySelector(prestashop.selectors.product.prices)
        ?.replaceWith(parseToHtml(product_prices));

    document.querySelector(prestashop.selectors.product.customization)
        ?.replaceWith(parseToHtml(product_customization));

    document.querySelector(prestashop.selectors.product.variantsUpdate)
        ?.replaceWith(parseToHtml(product_variants));

    document.querySelector(prestashop.selectors.product.discounts)
        ?.replaceWith(parseToHtml(product_discounts));

    document.querySelector(prestashop.selectors.product.additionalInfos)
        ?.replaceWith(parseToHtml(product_additional_info));

    document.querySelector(prestashop.selectors.product.details)
        ?.replaceWith(parseToHtml(product_details));

    document.querySelector(prestashop.selectors.product.flags)
        ?.replaceWith(parseToHtml(product_flags));
};

const isPreview = () => {
    const urlParams = new URLSearchParams(window.location.search);

    return urlParams.has('preview');
};


/**
 * Replace all "add to cart" sections but the quantity input
 * in order to keep quantity field intact i.e.
 *
 * @param {object} data of updated product and cat
 */
function replaceAddToCartSections({ product_add_to_cart }) {
    let productAddToCart = null;
    const addToCartHtml = parseToHtml(product_add_to_cart);
    const addToCartElements = document.querySelectorAll('.js-product-add-to-cart');

    for (let i = 0; i < addToCartElements.length; i++) {
        if (addToCartElements[i].classList.contains('product-add-to-cart')) {
            productAddToCart = addToCartElements[i];
        }
    }

    if (productAddToCart === null) {
        danger(prestashop.t.alert.genericHttpError);

        return;
    }

    let currentAddToCartBlockSelector = prestashop.selectors.product.addToCart;

    if (isQuickViewOpen()) {
        currentAddToCartBlockSelector = `.quickview ${currentAddToCartBlockSelector}`;
    }

    const currentAddToCartBlock = document.querySelector(currentAddToCartBlockSelector);
    const productAvailabilitySelector = '.js-add-to-cart-btn-wrapper';
    const productAvailabilityMessageSelector = '.js-product-availability';
    const productMinimalQuantitySelector = '.js-product-minimal-quantity';

    replaceAddToCartSection({
        addToCartSnippet: addToCartHtml,
        targetParent: currentAddToCartBlock,
        targetSelector: productAvailabilitySelector,
    });

    replaceAddToCartSection({
        addToCartSnippet: addToCartHtml,
        targetParent: currentAddToCartBlock,
        targetSelector: productAvailabilityMessageSelector,
    });

    replaceAddToCartSection({
        addToCartSnippet: addToCartHtml,
        targetParent: currentAddToCartBlock,
        targetSelector: productMinimalQuantitySelector,
    });
}


/**
 * Find DOM elements and replace their content
 *
 * @param {object} replacement Data to be replaced on the current page
 */
function replaceAddToCartSection({ addToCartSnippet, targetParent, targetSelector }) {
    const destinationObject = targetParent.querySelector(targetSelector);

    if (destinationObject === null) {
        return;
    }

    const replace = addToCartSnippet.querySelector(targetSelector);

    if (replace) {
        destinationObject.replaceWith(parseToHtml(replace.outerHTML));
    } else {
        destinationObject.textContent = '';
    }
}

/**
 * Update the product html
 *
 * @param {string} event
 * @param {string} eventType
 * @param {string} updateUrl
 */
const updateProductData = async (event, eventType, updateUrl) => {
    const productActions = document.querySelector(prestashop.selectors.product.actions);
    const quantityWantedInput = productActions.querySelector(prestashop.selectors.quantityWanted);

    const form = productActions.querySelector('form');
    const formSerialized = fromSerializeObject(form);
    let updateRatingEvent;

    if (typeof Event === 'function') {
        updateRatingEvent = new Event('updateRating');
    } else {
        updateRatingEvent = document.createEvent('Event');
        updateRatingEvent.initEvent('updateRating', true, true);
    }

    // New request only if new value
    if (
        event
        && event.type === 'keyup'
        && quantityWantedInput?.value === quantityWantedInput?.dataset.oldValue
    ) {
        return;
    }

    quantityWantedInput.dataset.oldValue = quantityWantedInput.value ? quantityWantedInput.value : 1;

    if (currentRequestDelayedId) {
        clearTimeout(currentRequestDelayedId);
    }

    // Most update need to occur (almost) instantly, but in some cases (like keyboard actions)
    // we need to delay the update a bit more
    let updateDelay = 30;

    if (eventType === 'updatedProductQuantity') {
        updateDelay = 750;
    }

    currentRequestDelayedId = setTimeout(async () => {
        try {
            const data = await prestashop.frontAPI.updateProduct(formSerialized, quantityWantedInput.value, isQuickViewOpen(), isPreview());

            // Used to avoid image blinking if same image = epileptic friendly

            replaceDOMElements(data);

            const customizationIdInput = document.querySelector(prestashop.selectors.cart.productCustomizationId);
            // refill customizationId input value when updating quantity or combination
            if (
                (eventType === 'updatedProductQuantity' || eventType === 'updatedProductCombination')
                && data.id_customization
            ) {
                customizationIdInput && (customizationIdInput.value = data.id_customization);
            } else {
                customizationIdInput && (customizationIdInput.value = 0);
            }

            replaceAddToCartSections(data);
            const minimalProductQuantity = parseInt(
                data.product_minimal_quantity,
                10,
            );

            document.dispatchEvent(updateRatingEvent);

            // Prevent quantity input from blinking with classic theme.
            if (
                !isNaN(minimalProductQuantity)
                && eventType !== 'updatedProductQuantity'
            ) {
                quantityWantedInput.setAttribute('min', minimalProductQuantity);
                quantityWantedInput.value = minimalProductQuantity;
            }

            prestashop.emit('updatedProduct', data, formSerialized);
        } catch (e) {
            danger(prestashop.t.alert.genericHttpError);
        }

        currentRequestDelayedId = null;
    }, updateDelay);
};

const handleProductFormChange = (event) => {
    formChanged = true;

    prestashop.emit('updateProduct', {
        eventType: 'updatedProductCombination',
        event,
        // Following variables are not used anymore, but kept for backward compatibility
        resp: {},
        reason: {
            productUrl: prestashop.urls.pages.product || '',
        },
    });
}

const handleUpdateCart = (event) => {
    if (!event || !event.reason || event.reason.linkAction !== 'add-to-cart') {
        return;
    }

    const quantityInput = document.querySelector('#quantity_wanted');
    // Force value to 1, it will automatically trigger updateProduct and reset the appropriate min value if needed

    if (quantityInput) {
        quantityInput.value = 1;
    }
}

const handleError = (event) => {
    if (event?.errorMessage) {
        danger(event.errorMessage);
    }
}

const handleUpdateProduct = ({ event, eventType }) => {
    updateProductData(event, eventType, prestashop.urls.pages.product);
}

const handleUpdatedProduct = (args, formData) => {
    if (!args.product_url || !args.id_product_attribute) {
        return;
    }

    /*
     * If quickview modal is present we are not on product page, so
     * we don't change the url nor title
     */
    if (isQuickViewOpen()) {
        return;
    }

    let pageTitle = document.title;

    if (args.product_title) {
        pageTitle = args.product_title;
        $(document).attr('title', pageTitle);
    }

    if (!isOnPopStateEvent) {
        window.history.pushState(
            {
                id_product_attribute: args.id_product_attribute,
                form: formData,
            },
            pageTitle,
            args.product_url,
        );
    }

    isOnPopStateEvent = false;
}

const handlePopState = (event) => {
    isOnPopStateEvent = true;

    if (
        (!event.state
            || (event.state && event.state.form && event.state.form.length === 0))
        && !formChanged
    ) {
        return;
    }

    const form = document.querySelector(`${prestashop.selectors.product.actions} form`);
    const handleState = (data) => {
        const element = form.querySelector(`[name="${data.name}"]`);

        if (element) {
            element.value = data.value;
        }
    }

    if (event.state && event.state.form) {
        event.state.form.forEach(handleState);
    } else {
        firstFormData.forEach(handleState);
    }

    prestashop.emit('updateProduct', {
        eventType: 'updatedProductCombination',
        event,
        // Following variables are not used anymore, but kept for backward compatibility
        resp: {},
        reason: {
            productUrl: prestashop.urls.pages.product || '',
        },
    });
}

const attachEventListeners = () => {
    // MOVE TO EVENT DELEGATED WITH BOOTSTRAP 5
    $('body').on(
        'change touchspin.on.startspin',
        `${prestashop.selectors.product.variants} *[name]`,
        handleProductFormChange,
    );

    prestashop.on('updateCart', handleUpdateCart);
    prestashop.on('showErrorNextToAddtoCartButton', handleError);

    // Refresh all the product content
    prestashop.on('updateProduct', handleUpdateProduct);

    prestashop.on('updatedProduct', handleUpdatedProduct);


    window.addEventListener('popstate', handlePopState);
}

const initProductPage = () => {
    const productActions = document.querySelector(prestashop.selectors.product.actions);
    const formElement = productActions.querySelector('form');
    const formSerialized = formElement ? fromSerializeObject(formElement) : null;

    if (!formSerialized) {
        return;
    }

    for (const prop in formSerialized) {
        if (Object.hasOwn(formSerialized, prop)) {
            firstFormData.push({ name: prop, value: formSerialized[prop] });
        }
    }
}

const updateProduct = () => {
    attachEventListeners();
    initProductPage();
};

export default updateProduct;
