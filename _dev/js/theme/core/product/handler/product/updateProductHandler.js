import prestashop from 'prestashop';
import isQuickViewOpen from '../../utils/isQuickViewOpen';
import isProductPreview from '../../utils/isProductPreview';
import updateProductRequest from '../../request/product/updateProductRequest';
import productFormDataPersister from '../../persister/productFormDataPersister';
import productStateStore from '../../store/productStateStore';
import updateQuantityInputHandler from './updateQuantityInputHandler';
import updateProductCustomizationHandler from './updateProductCustomizationHandler';
import updateProductDOMElementsHandler from './updateProductDOMElementsHandler';
import { fromSerializeObject } from '../../../../../utils/formSerialize';
import productEventContextSelector from '../../utils/productEventContextSelector';

const { getCurrentRequestDelayedId, setCurrentRequestDelayedId } = productStateStore();

/**
 * Handles the 'updateProduct' event.
 *
 * @param {object} params - Event object.
 * @param {string} params.eventType - Event type.
 * @return {Promise<void>} - A Promise that resolves when the update is completed.
 */
const updateProductHandler = async ({ eventType }) => {
  const isQuickView = isQuickViewOpen();
  const contextElement = document.querySelector(productEventContextSelector());
  const productActions = contextElement.querySelector(prestashop.selectors.product.actions);
  const quantityWantedInput = productActions.querySelector(prestashop.selectors.quantityWanted);

  const form = productActions.querySelector('.js-product-form');
  const formSerialized = fromSerializeObject(form);
  const updateRatingEvent = new Event('updateRating');

  if (getCurrentRequestDelayedId()) {
    clearTimeout(getCurrentRequestDelayedId());
  }

  const updateDelay = 50;

  const timeoutId = setTimeout(async () => {
    const idProductAttribute = formSerialized?.id_product_attribute || 0;
    const idCustomization = formSerialized?.id_customization || 0;

    const payload = {
      quantity_wanted: Number.parseInt(quantityWantedInput.value, 10),
      preview: isProductPreview() ? 1 : 0,
      quickview: isQuickView ? 1 : 0,
      ...formSerialized,
      id_product: Number.parseInt(formSerialized.id_product, 10),
      id_product_attribute: Number.parseInt(idProductAttribute, 10),
      id_customization: Number.parseInt(idCustomization, 10),
    };
    const { getRequest } = updateProductRequest(payload);

    try {
      const data = await getRequest();

      updateProductDOMElementsHandler(data);
      updateProductCustomizationHandler(eventType, data);
      updateQuantityInputHandler(eventType, data);

      if (isQuickView) {
        document.dispatchEvent(updateRatingEvent);
      }

      const { persist, get: getPersistedData } = productFormDataPersister();
      persist(form);

      prestashop.emit('updatedProduct', data, getPersistedData());
    } catch (error) {
      prestashop.emit('handleError', {
        eventType: 'updateProduct',
        resp: {},
        error,
      });
    }

    setCurrentRequestDelayedId(null);
  }, updateDelay);

  setCurrentRequestDelayedId(timeoutId);
};

export default updateProductHandler;
