import prestashop from 'prestashop';
import productStateStore from '../../store/productStateStore';

const { setFormChanged } = productStateStore();

/**
 * Sets the form changed state
 * Side effect: emits 'updateProduct' event
 * @param event {Event}
 */
const productFormChangeHandler = (event) => {
  setFormChanged(true);

  prestashop.emit('updateProduct', {
    eventType: 'updatedProductCombination',
    event,
  });
};

export default productFormChangeHandler;
