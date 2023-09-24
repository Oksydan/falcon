import useAlertToast from '../../../../components/useAlertToast';
import addToCartRequest from '../../request/cart/addToCartRequest';
import sprintf from '../../../../utils/sprintf';

const { danger } = useAlertToast();

/**
 * Handle add to cart event on form submit
 * @param event {object} - submit event
 * @returns {Promise<void>}
 */
const addToCartHandler = async (event) => {
  event.preventDefault();

  const form = event.currentTarget?.form;
  const addToCartButton = event.currentTarget;

  const isQuantityInputValid = (input) => {
    let validInput = true;

    const minimalValue = parseInt((input?.getAttribute('min') || 0), 10);

    if (minimalValue && input.value < minimalValue) {
      validInput = false;
    }

    return validInput;
  };

  const idProduct = Number.parseInt(form.querySelector('[name=id_product]').value, 10);
  const quantityInput = form.querySelector('[name=qty]');
  const qty = Number.parseInt(quantityInput?.value, 10) || 0;
  const idProductAttribute = form.querySelector('[name=id_product_attribute]')?.value || 0;
  const idCustomization = form.querySelector('[name=id_customization]')?.value || 0;

  const onInvalidQuantity = (input) => {
    danger(sprintf(prestashop.t.alert.minimalQuantity, input.getAttribute('min')));
  };

  if (quantityInput && !isQuantityInputValid(quantityInput)) {
    onInvalidQuantity(quantityInput);
    addToCartButton.removeAttribute('disabled');

    return;
  }

  const payload = {
    id_product: idProduct,
    qty,
    id_product_attribute: idProductAttribute,
    id_customization: idCustomization,
  };

  const { getRequest } = addToCartRequest(payload);

  addToCartButton.setAttribute('disabled', true);

  try {
    const resp = await getRequest();

    if (!resp.hasError) {
      prestashop.emit('updateCart', {
        reason: {
          idProduct: resp.id_product,
          idProductAttribute: resp.id_product_attribute,
          idCustomization: resp.id_customization,
          linkAction: 'add-to-cart',
          cart: resp.cart,
        },
        resp,
      });
    } else {
      prestashop.emit('handleError', {
        eventType: 'addProductToCart',
        resp,
      });
    }
  } catch (error) {
    danger(error.message);
  }

  setTimeout(() => {
    addToCartButton.removeAttribute('disabled');
  }, 1000);
};

export default addToCartHandler;
