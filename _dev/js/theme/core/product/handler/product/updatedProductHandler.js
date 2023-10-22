import isQuickViewOpen from '../../utils/isQuickViewOpen';
import productStateStore from '../../store/productStateStore';

const { isOnPopState, setOnPopState } = productStateStore();

/**
 * Handles the 'updatedProduct' event by updating the URL, title, and popState.
 *
 * @param {object} eventData - Event object with response data.
 * @param {string|null} eventData.product_url - Updated product URL.
 * @param {string|null} eventData.id_product_attribute - Updated product attribute ID.
 * @param {string} eventData.product_title - Updated product title.
 * @param {object} formData - Form data.
 * @returns {void}
 * @sideEffect Modifies the document title, updates the URL, and sets popState in productStateStore.
 */
const updatedProductHandler = ({
  product_url: responseProductUrl = null,
  id_product_attribute: responseIdProductAttribute = null,
  product_title: responseProductTitle = '',
}, formData) => {
  if (!responseProductUrl || !responseIdProductAttribute) {
    return;
  }

  /*
   * If the quickview modal is present, we are not on the product page, so
   * we don't change the URL or title.
   */
  if (isQuickViewOpen()) {
    return;
  }

  const pageTitle = document.title;

  if (responseProductTitle) {
    document.title = responseProductTitle;
  }

  if (!isOnPopState()) {
    window.history.pushState(
      {
        id_product_attribute: responseIdProductAttribute,
        form: formData,
      },
      pageTitle,
      responseProductUrl,
    );
  }

  setOnPopState(false);
};

export default updatedProductHandler;
