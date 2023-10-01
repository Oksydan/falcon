import prestashop from 'prestashop';
import productFormDataPersister from '../../persister/productFormDataPersister';
import productStateStore from '../../store/productStateStore';

const { setOnPopState, isFormChanged } = productStateStore();

const { get } = productFormDataPersister();

const productPopStateHandler = (event) => {
  setOnPopState(true);

  const formData = event?.state?.form || get();

  if ((!formData || formData?.length === 0) && !isFormChanged()) {
    return;
  }

  const form = document.querySelector(`${prestashop.selectors.product.actions} form`);

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
