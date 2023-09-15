import prestashop from 'prestashop';
import useCheckoutStepsController from '../../components/useCheckoutStepsController';

const checkoutStepChangeHandler = (event) => {
  event.preventDefault();
  const { changeStep, stepsSelector } = useCheckoutStepsController();

  const clickedStep = event.target.closest(stepsSelector);

  changeStep(clickedStep);
  prestashop.emit('changedCheckoutStep', { event });
};

export default checkoutStepChangeHandler;
