import prestashop from 'prestashop';
import useCheckoutStepsController from '../../components/useCheckoutStepsController';

/**
 * Checkout step change handler
 * @param event {object} - click event
 */
const checkoutStepChangeHandler = (event) => {
  event.preventDefault();
  const { changeStep, stepsSelector } = useCheckoutStepsController();

  const clickedStep = event.target.closest(stepsSelector);

  changeStep(clickedStep);
  prestashop.emit('changedCheckoutStep', { event });
};

export default checkoutStepChangeHandler;
