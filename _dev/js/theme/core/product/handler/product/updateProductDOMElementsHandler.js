import prestashop from 'prestashop';
import { each, parseToHtml } from '../../../../../utils/DOM/DOMHelpers';
import productEventContextSelector from '../../utils/productEventContextSelector';

/**
 * Replaces an HTML element with a new HTML string.
 *
 * @param {HTMLElement} element - The element to replace.
 * @param {string} htmlString - The HTML string to replace the element with.
 * @returns {void}
 * @sideeffect Replaces the specified element with the new HTML string.
 */
const replaceElement = (element, htmlString) => {
  const newElement = parseToHtml(htmlString);
  element.replaceWith(newElement);
};

/**
 * Updates DOM elements of the product page based on the provided event data.
 *
 * @param {object} eventData - Event data containing various HTML strings for different parts of the product page.
 * @param {string} eventData.product_prices - HTML string for product prices.
 * @param {string} eventData.product_customization - HTML string for product customization.
 * @param {string} eventData.product_variants - HTML string for product variants.
 * @param {string} eventData.product_discounts - HTML string for product discounts.
 * @param {string} eventData.product_additional_info - HTML string for product additional info.
 * @param {string} eventData.product_details - HTML string for product details.
 * @param {string} eventData.product_flags - HTML string for product flags.
 * @param {string} eventData.product_add_to_cart - HTML string for product add to cart.
 * @returns {void}
 * @sideeffect Updates DOM elements of the product page with the provided HTML strings.
 */
const updateProductDOMElementsHandler = ({
  /* eslint-disable */
  product_prices,
  product_customization,
  product_variants,
  product_discounts,
  product_additional_info,
  product_details,
  product_flags,
  product_add_to_cart,
  /* eslint-enable */
}) => {
  const contextSelector = productEventContextSelector();

  each(`${contextSelector} ${prestashop.selectors.product.prices}`, (el) => replaceElement(el, product_prices));
  each(`${contextSelector} ${prestashop.selectors.product.customization}`, (el) => replaceElement(el, product_customization));
  each(`${contextSelector} ${prestashop.selectors.product.variantsUpdate}`, (el) => replaceElement(el, product_variants));
  each(`${contextSelector} ${prestashop.selectors.product.discounts}`, (el) => replaceElement(el, product_discounts));
  each(`${contextSelector} ${prestashop.selectors.product.additionalInfos}`, (el) => replaceElement(el, product_additional_info));
  each(`${contextSelector} ${prestashop.selectors.product.details}`, (el) => replaceElement(el, product_details));
  each(`${contextSelector} ${prestashop.selectors.product.flags}`, (el) => replaceElement(el, product_flags));
  each(`${contextSelector} ${prestashop.selectors.product.addToCart}`, (el) => replaceElement(el, product_add_to_cart));
};

export default updateProductDOMElementsHandler;
