import useAlertToast from '@js/theme/components/useAlertToast';

const { danger } = useAlertToast();

const cartDelete = () => {
  // REMOVE EVENT FROM JQUERY AND ADD EVENT HANDLER FORM BS5 - DELEGATION IS NEEDED
  $('body').on('click', '.js-remove-from-cart', handleCartDelete);
};

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

export default cartDelete;
