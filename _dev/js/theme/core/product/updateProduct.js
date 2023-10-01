import prestashop from 'prestashop';
import { fromSerializeObject } from '@js/theme/utils/formSerialize';
import parseToHtml from '@js/theme/utils/parseToHtml';
import useAlertToast from '@js/theme/components/useAlertToast';
import useEvent from '@js/theme/components/event/useEvent';
import isQuickViewOpen from './utils/isQuickViewOpen';
import isProductPreview from './utils/isProductPreview';
import updateProductRequest from './request/product/updateProductRequest';
import productFormDataPersister from './persister/productFormDataPersister';
import productStateStore from './store/productStateStore';

const { setFormChanged, getCurrentRequestDelayedId, setCurrentRequestDelayedId } = productStateStore();

const { on } = useEvent();

const { danger } = useAlertToast();

const replaceDOMElements = ({
  /* eslint-disable */
  product_cover_thumbnails,
  product_prices,
  product_customization,
  product_variants,
  product_discounts,
  product_additional_info,
  product_details,
  product_flags,
  /* eslint-enable */
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

/**
 * Find DOM elements and replace their content
 *
 * @param {object} replacement Data to be replaced on the current page
 */
const replaceAddToCartSection = ({ addToCartSnippet, targetParent, targetSelector }) => {
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
};

/**
 * Replace all "add to cart" sections but the quantity input
 * in order to keep quantity field intact i.e.
 *
 * @param {object} data of updated product and cat
 */
const replaceAddToCartSections = ({
  // eslint-disable-next-line camelcase
  product_add_to_cart,
}) => {
  let productAddToCart = null;
  const addToCartHtml = parseToHtml(product_add_to_cart);
  const addToCartElements = document.querySelectorAll('.js-product-add-to-cart');

  for (let i = 0; i < addToCartElements.length; i += 1) {
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
    currentAddToCartBlockSelector = `.js-quickview ${currentAddToCartBlockSelector}`;
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
};

/**
 * Update the product html
 *
 * @param {string} event
 * @param {string} eventType
 * @param {string} updateUrl
 */
const updateProductData = async (event, eventType) => {
  const productActions = document.querySelector(prestashop.selectors.product.actions);
  const quantityWantedInput = productActions.querySelector(prestashop.selectors.quantityWanted);

  const form = productActions.querySelector('form');
  const formSerialized = fromSerializeObject(form);
  const updateRatingEvent = new Event('updateRating');

  // New request only if new value
  if (
    event
        && event.type === 'keyup'
        && quantityWantedInput?.value === quantityWantedInput?.dataset.oldValue
  ) {
    return;
  }

  quantityWantedInput.dataset.oldValue = quantityWantedInput.value ? quantityWantedInput.value : 1;

  if (getCurrentRequestDelayedId()) {
    clearTimeout(getCurrentRequestDelayedId());
  }

  // Most update need to occur (almost) instantly, but in some cases (like keyboard actions)
  // we need to delay the update a bit more
  let updateDelay = 30;

  if (eventType === 'updatedProductQuantity') {
    updateDelay = 750;
  }

  const timeoutId = setTimeout(async () => {
    const idProductAttribute = formSerialized?.id_product_attribute || 0;
    const idCustomization = formSerialized?.id_customization || 0;

    const payload = {
      quantity_wanted: Number.parseInt(quantityWantedInput.value, 10),
      preview: isProductPreview() ? 1 : 0,
      quickview: isQuickViewOpen() ? 1 : 0,
      ...formSerialized,
      id_product: Number.parseInt(formSerialized.id_product, 10),
      id_product_attribute: Number.parseInt(idProductAttribute, 10),
      id_customization: Number.parseInt(idCustomization, 10),
    };
    const { getRequest } = updateProductRequest(payload);

    try {
      const data = await getRequest();

      // Used to avoid image blinking if same image = epileptic friendly

      replaceDOMElements(data);

      const customizationIdInput = document.querySelector(prestashop.selectors.cart.productCustomizationId);
      // refill customizationId input value when updating quantity or combination
      if (
        (eventType === 'updatedProductQuantity' || eventType === 'updatedProductCombination')
                && data.id_customization
      ) {
        if (customizationIdInput) {
          customizationIdInput.value = data.id_customization;
        }
      } else if (customizationIdInput) {
        customizationIdInput.value = 0;
      }

      replaceAddToCartSections(data);
      const minimalProductQuantity = parseInt(
        data.product_minimal_quantity,
        10,
      );

      document.dispatchEvent(updateRatingEvent);

      // Prevent quantity input from blinking with classic theme.
      if (
        !Number.isNaN(minimalProductQuantity)
                && eventType !== 'updatedProductQuantity'
      ) {
        quantityWantedInput.setAttribute('min', minimalProductQuantity);
        quantityWantedInput.value = minimalProductQuantity;
      }

      const { persist, get: getPersistedData } = productFormDataPersister();
      persist(form);

      prestashop.emit('updatedProduct', data, getPersistedData());
    } catch (e) {
      danger(prestashop.t.alert.genericHttpError);
    }

    setCurrentRequestDelayedId(null);
  }, updateDelay);

  setCurrentRequestDelayedId(timeoutId);
};

const handleProductFormChange = (event) => {
  setFormChanged(true);

  prestashop.emit('updateProduct', {
    eventType: 'updatedProductCombination',
    event,
    // Following variables are not used anymore, but kept for backward compatibility
    resp: {},
    reason: {
      productUrl: prestashop.urls.pages.product || '',
    },
  });
};

const handleUpdateCart = (event) => {
  if (!event || !event.reason || event.reason.linkAction !== 'add-to-cart') {
    return;
  }

  const quantityInput = document.querySelector('#quantity_wanted');
  // Force value to 1, it will automatically trigger updateProduct and reset the appropriate min value if needed

  if (quantityInput) {
    quantityInput.value = 1;
  }
};

const handleUpdateProduct = ({ event, eventType }) => {
  updateProductData(event, eventType);
};

const attachEventListeners = () => {
  on(document, 'change', `${prestashop.selectors.product.variants} *[name]`, handleProductFormChange);

  prestashop.on('updateCart', handleUpdateCart);
  // Refresh all the product content
  prestashop.on('updateProduct', handleUpdateProduct);
};

const updateProduct = () => {
  attachEventListeners();
};

export default updateProduct;
