import isQuickViewOpen from '../../utils/isQuickViewOpen';
import productStateStore from '../../store/productStateStore';

const { isOnPopState, setOnPopState } = productStateStore();

const updatedProductHandler = ({
  product_url: responseProductUrl = null,
  id_product_attribute: responseIdProductAttribute = null,
  product_title: responseProductTitle = '',
}, formData) => {
  if (!responseProductUrl || !responseIdProductAttribute) {
    return;
  }

  /*
     * If quickview modal is present we are not on product page, so
     * we don't change the url nor title
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
