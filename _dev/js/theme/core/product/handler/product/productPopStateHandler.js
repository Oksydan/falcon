import prestashop from 'prestashop';
import productFormDataPersister from '../../persister/productFormDataPersister';
import productStateStore from '../../store/productStateStore';
import productEventContextSelector from "../../utils/productEventContextSelector";

const { setOnPopState, isFormChanged } = productStateStore();

const { get } = productFormDataPersister();

/**
 * Handle popstate event for product page
 * Side effect: emits 'updateProduct' event, sets popState in productStateStore
 * @param {Event} event
 */
const productPopStateHandler = (event) => {
  const contextElement = document.querySelector(productEventContextSelector());
  setOnPopState(true);

  const formData = event?.state?.form || get();

  if ((!formData || formData?.length === 0) && !isFormChanged()) {
    return;
  }

  const form = contextElement.querySelector(`${prestashop.selectors.product.actions} .js-product-form`);

  const handleFormElementState = (data) => {
    const element = form.querySelector(`[name="${data.name}"]`);

    if (element) {
      element.value = data.value;
    }
  };

  formData.forEach(handleFormElementState);

  prestashop.emit('updateProduct', {
    eventType: 'updatedProductCombination',
    event,
  });
};

export default productPopStateHandler;
