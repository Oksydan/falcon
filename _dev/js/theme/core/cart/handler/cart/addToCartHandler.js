import prestashop from 'prestashop';
import useAlertToast from '../../../../components/useAlertToast';
import addToCartRequest from '../../request/cart/addToCartRequest';
import sprintf from '../../../../../utils/sprintf';

const { danger } = useAlertToast();

/**
 * Handles the "add to cart" event on form submission, updating the cart accordingly.
 * @param {Event} event - The submit event that triggered the "add to cart" action.
 * @param {HTMLElement} event.delegateTarget - The form element that was submitted.
 * @throws {Error} Will throw an error if required data is missing or if an error occurs during the process.
 * @returns {Promise<void>} - A Promise that resolves once the "add to cart" process is complete.
 */
const addToCartHandler = async (event) => {
  event.preventDefault();

  const form = event.delegateTarget?.form;
  const addToCartButton = event.delegateTarget;

  const isQuantityInputValid = (input) => {
    let validInput = true;

    const minimalValue = parseInt((input?.getAttribute('min') || 0), 10);

    if (minimalValue && input.value < minimalValue) {
      validInput = false;
    }

    return validInput;
  };

  const idProductInput = form.querySelector('[name=id_product]');
  const quantityInput = form.querySelector('[name=qty]');
  const idProductAttributeInput = form.querySelector('[name=id_product_attribute]');
  const idCustomizationInout = form.querySelector('[name=id_customization]');

  const idProduct = Number.parseInt((idProductInput?.value || null), 10);
  const qty = Number.parseInt(quantityInput?.value, 10) || 0;
  const idProductAttribute = Number.parseInt((idProductAttributeInput?.value || null), 10);
  const idCustomization = Number.parseInt(idCustomizationInout?.value, 10) || 0;

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
    id_product_attribute: Number.parseInt(idProductAttribute, 10),
    id_customization: Number.parseInt(idCustomization, 10),
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
    prestashop.emit('handleError', {
      eventType: 'addProductToCart',
      resp: {},
      error,
    });
  }

  addToCartButton.removeAttribute('disabled');
};

export default addToCartHandler;
