import prestashop from 'prestashop';
import parseToHtml from '../../../../utils/parseToHtml';
import { each } from '../../../../utils/DOMHelpers';

const replaceElement = (element, htmlString) => {
  const newElement = parseToHtml(htmlString);

  element.replaceWith(newElement);
};

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
  each(prestashop.selectors.product.imageContainer, (el) => replaceElement(el, product_cover_thumbnails));
  each(prestashop.selectors.product.prices, (el) => replaceElement(el, product_prices));
  each(prestashop.selectors.product.customization, (el) => replaceElement(el, product_customization));
  each(prestashop.selectors.product.variantsUpdate, (el) => replaceElement(el, product_variants));
  each(prestashop.selectors.product.discounts, (el) => replaceElement(el, product_discounts));
  each(prestashop.selectors.product.additionalInfos, (el) => replaceElement(el, product_additional_info));
  each(prestashop.selectors.product.details, (el) => replaceElement(el, product_details));
  each(prestashop.selectors.product.flags, (el) => replaceElement(el, product_flags));
  each(prestashop.selectors.product.addToCart, (el) => replaceElement(el, product_add_to_cart));
};

export default updateProductDOMElementsHandler;
