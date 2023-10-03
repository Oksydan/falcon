import prestashop from 'prestashop';
import parseToHtml from '../../../../utils/parseToHtml';
import { each } from '../../../../utils/DOMHelpers';
import productEventContextSelector from '../../utils/productEventContextSelector';

/**
 * Replace element with new html string
 * @param element {HTMLElement} - element to replace
 * @param htmlString {string} - html string to replace with
 */
const replaceElement = (element, htmlString) => {
  const newElement = parseToHtml(htmlString);

  element.replaceWith(newElement);
};

/**
 * Update DOM elements of the product page
 * Side effect: update DOM elements of the product page
 * @param eventData {object} - event data
 * @param eventData.product_cover_thumbnails {string} - product cover thumbnails html string
 * @param eventData.product_prices {string}  - product prices html string
 * @param eventData.product_customization {string} - product customization html string
 * @param eventData.product_variants {string} - product variants html string
 * @param eventData.product_discounts {string} - product discounts html string
 * @param eventData.product_additional_info {string} - product additional info html string
 * @param eventData.product_details {string} - product details html string
 * @param eventData.product_flags {string} - product flags html string
 * @param eventData.product_add_to_cart {string} - product add to cart html string
 * @return {void}
 */
const updateProductDOMElementsHandler = ({
  /* eslint-disable */
                                           product_cover_thumbnails,
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
