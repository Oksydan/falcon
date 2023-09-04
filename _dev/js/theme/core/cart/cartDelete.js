import useAlertToast from '@js/theme/components/useAlertToast';
import useEvent from '@js/theme/components/event/useEvent';

const { on } = useEvent();
const { danger } = useAlertToast();

const handleCartDelete = async (event) => {
  event.preventDefault();

  const button = event.currentTarget;
  const { dataset } = button;
  const { idProduct, idProductAttribute, idCustomization = 0 } = dataset;

  try {
    const resp = await prestashop.frontAPI.deleteFromCart(idProduct, idProductAttribute, idCustomization);

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

const cartDelete = () => {
  on(document, 'click', '.js-remove-from-cart', handleCartDelete);
};

export default cartDelete;
