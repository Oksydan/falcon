import prestashop from 'prestashop';
import productStateStore from '../../store/productStateStore';

const { setFormChanged } = productStateStore();

const productFormChangeHandler = (event) => {
  setFormChanged(true);

  prestashop.emit('updateProduct', {
    eventType: 'updatedProductCombination',
    event,
  });
};

export default productFormChangeHandler;
