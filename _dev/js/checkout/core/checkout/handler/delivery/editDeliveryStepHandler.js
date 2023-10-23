import prestashop from 'prestashop';
import useCheckoutStepsController from '../../components/useCheckoutStepsController';

/**
 * Handles the click event to edit the delivery step in the Prestashop checkout process.
 *
 * @function
 * @param {object} event - The click event.
 */
const editDeliveryStepHandler = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const { changeStep } = useCheckoutStepsController();
  const deliveryStep = document.querySelector('#checkout-delivery-step');

  changeStep(deliveryStep);
  prestashop.emit('editDelivery');
};

export default editDeliveryStepHandler;
