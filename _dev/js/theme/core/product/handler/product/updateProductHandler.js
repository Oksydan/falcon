import prestashop from 'prestashop';
import isQuickViewOpen from '../../utils/isQuickViewOpen';
import isProductPreview from '../../utils/isProductPreview';
import updateProductRequest from '../../request/product/updateProductRequest';
import productFormDataPersister from '../../persister/productFormDataPersister';
import productStateStore from '../../store/productStateStore';
import updateQuantityInputHandler from './updateQuantityInputHandler';
import updateProductCustomizationHandler from './updateProductCustomizationHandler';
import updateProductDOMElementsHandler from './updateProductDOMElementsHandler';
import { fromSerializeObject } from '../../../../utils/formSerialize';
import useAlertToast from '../../../../components/useAlertToast';

const { danger } = useAlertToast();
const { getCurrentRequestDelayedId, setCurrentRequestDelayedId } = productStateStore();

/**
 * Handle 'updateProduct' event
 * @param params - event object
 * @param params.eventType {string} - event type
 * @return {Promise<void>}
 */
const updateProductHandler = async ({ eventType }) => {
  const productActions = document.querySelector(prestashop.selectors.product.actions);
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
      quickview: isQuickViewOpen() ? 1 : 0,
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

      document.dispatchEvent(updateRatingEvent);

      const { persist, get: getPersistedData } = productFormDataPersister();
      persist(form);

      prestashop.emit('updatedProduct', data, getPersistedData());
    } catch (e) {
      danger(prestashop.t.alert.genericHttpError);
    }

    setCurrentRequestDelayedId(null);
  }, updateDelay);

  setCurrentRequestDelayedId(timeoutId);
};

export default updateProductHandler;
