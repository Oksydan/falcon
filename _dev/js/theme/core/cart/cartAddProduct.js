import useAlertToast from '@js/theme/components/useAlertToast';
import sprintf from '@js/theme/utils/sprintf';
import useEvent from '@js/theme/components/event/useEvent';

const { on } = useEvent();
const { danger } = useAlertToast();

const eventHandler = async (event) => {
  event.preventDefault();

  const form = event.currentTarget?.form;
  const addToCartButton = event.currentTarget;

  addToCartButton.setAttribute('disabled', true);

  const isQuantityInputValid = (input) => {
    let validInput = true;

    const minimalValue = parseInt((input?.getAttribute('min') || 0), 10);

    if (minimalValue && input.value < minimalValue) {
      validInput = false;
    }

    return validInput;
  };

  const idProduct = form.querySelector('[name=id_product]').value;
  const quantityInput = form.querySelector('[name=qty]');
  const quantity = quantityInput?.value || 0;
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

  try {
    const resp = await prestashop.frontAPI.addToCart(idProduct, quantity, idProductAttribute, idCustomization);

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

const cartAddProduct = () => {
  on(document, 'click', '[data-button-action="add-to-cart"]', eventHandler);
};

export default cartAddProduct;
