import prestashop from 'prestashop';
import productStateStore from '../../store/productStateStore';

const { setFormChanged } = productStateStore();

/**
 * Handles changes in the product form.
 * Sets the form changed state and emits the 'updateProduct' event.
 * @param {Event} event - The change event.
 * @returns {void}
 * @sideeffect Modifies the form changed state and emits an event.
 */
const productFormChangeHandler = (event) => {
  /**
   * Sets the form changed state to true.
   */
  setFormChanged(true);

  /**
   * Emits the 'updateProduct' event with specific event details.
   */
  prestashop.emit('updateProduct', {
    eventType: 'updatedProductCombination',
    event,
  });
};

export default productFormChangeHandler;
