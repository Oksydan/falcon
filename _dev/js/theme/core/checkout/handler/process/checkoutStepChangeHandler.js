import prestashop from 'prestashop';
import useCheckoutStepsController from '../../components/useCheckoutStepsController';

/**
 * Handles the change of a checkout step, preventing the default click event, updating the step, and emitting a 'changedCheckoutStep' event.
 *
 * @function
 * @param {object} event - The click event object.
 * @returns {void}
 */
const checkoutStepChangeHandler = (event) => {
  event.preventDefault();
  const { changeStep, stepsSelector } = useCheckoutStepsController();

  const clickedStep = event.target.closest(stepsSelector);

  changeStep(clickedStep);
  prestashop.emit('changedCheckoutStep', { event });
};

export default checkoutStepChangeHandler;
