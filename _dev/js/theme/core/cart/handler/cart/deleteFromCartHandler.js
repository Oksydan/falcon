import useAlertToast from '../../../../components/useAlertToast';
import deleteFromCartRequest from '../../request/deleteFromCartRequest';

const { danger } = useAlertToast();

/**
 * Delete product from cart handler
 * @param event
 * @returns {Promise<void>}
 */
const deleteFromCartHandler = async (event) => {
  event.preventDefault();

  const button = event.currentTarget;
  const { dataset } = button;
  const { idProduct, idProductAttribute, idCustomization = 0 } = dataset;

  const payload = {
    id_product: Number.parseInt(idProduct, 10),
    id_product_attribute: Number.parseInt(idProductAttribute, 10),
    id_customization: Number.parseInt(idCustomization, 10),
  };

  const { getRequest } = deleteFromCartRequest(payload);

  try {
    const resp = await getRequest();

    if (!resp.hasError) {
      prestashop.emit('updateCart', {
        reason: dataset || resp,
        resp,
      });
    } else {
      prestashop.emit('handleError', {
        eventType: 'deleteProductFromCart',
        resp,
      });
    }
  } catch (error) {
    danger(error.message);
  }
};

export default deleteFromCartHandler;
