import prestashop from 'prestashop';
import productFormDataPersister from '../../persister/productFormDataPersister';
import productStateStore from '../../store/productStateStore';
import productEventContextSelector from '../../utils/productEventContextSelector';

const { setOnPopState, isFormChanged } = productStateStore();

const { get } = productFormDataPersister();

/**
 * Handles the popstate event for the product page.
 * Side effect: Emits the 'updateProduct' event and sets popState in productStateStore.
 * @param {Event} event - The popstate event.
 * @returns {void}
 * @sideeffect Modifies the popState in productStateStore and emits an event.
 */
const productPopStateHandler = (event) => {
  /**
   * Retrieves the context element for the product event.
   */
  const contextElement = document.querySelector(productEventContextSelector());

  /**
   * Sets the popState in productStateStore to true.
   */
  setOnPopState(true);

  /**
   * Retrieves the form data from the popstate event or from the productFormDataPersister.
   */
  const formData = event?.state?.form || get();

  /**
   * Checks if the form data is empty and the form is not changed. If so, returns early.
   */
  if ((!formData || formData?.length === 0) && !isFormChanged()) {
    return;
  }

  /**
   * Retrieves the product form element from the context element.
   */
  const form = contextElement.querySelector(`${prestashop.selectors.product.actions} .js-product-form`);

  /**
   * Handles the state of form elements based on the retrieved form data.
   * @param {object} data - Form data object.
   * @returns {void}
   */
  const handleFormElementState = (data) => {
    /**
     * Retrieves the form element by name.
     */
    const element = form.querySelector(`[name="${data.name}"]`);

    /**
     * If the element exists, sets its value to the corresponding value from the form data.
     */
    if (element) {
      element.value = data.value;
    }
  };

  /**
   * Iterates over the form data and handles the state of each form element.
   */
  formData.forEach(handleFormElementState);

  /**
   * Emits the 'updateProduct' event with specific event details.
   */
  prestashop.emit('updateProduct', {
    eventType: 'updatedProductCombination',
    event,
  });
};

export default productPopStateHandler;
