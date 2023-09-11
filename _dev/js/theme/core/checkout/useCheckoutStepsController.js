import prestashop from 'prestashop';

import { getAllSiblingsBeforeElement, getAllSiblingsAfterElement } from '@js/theme/utils/DOMSelectorsHelper';

const useCheckoutStepsController = (stepsSelector = prestashop.selectors.checkout.step) => {
  const DOMClasses = {
    STEP_CURRENT: '-current',
    STEP_REACHABLE: '-reachable',
    STEP_COMPLETE: '-complete',
    STEP_CLICKABLE: '-clickable',
    STEP_UNREACHABLE: '-unreachable',
  };

  const isStepCurrent = (step) => step.classList.contains(DOMClasses.STEP_CURRENT);

  const isStepUnreachable = (step) => step.classList.contains(DOMClasses.STEP_UNREACHABLE);

  const hasStepContinueButton = (step) => step.querySelector('button.continue') !== null;

  const getCurrentStep = () => document.querySelector(`${stepsSelector}.${DOMClasses.STEP_CURRENT}`);

  const setCurrentStep = (step) => {
    getCurrentStep()?.classList.remove(DOMClasses.STEP_CURRENT);
    step.classList.add(DOMClasses.STEP_CURRENT);
  };

  const disableAllAfter = (step) => {
    const nextSteps = getAllSiblingsAfterElement(step);

    for (const nextStep of nextSteps) {
      nextStep.classList.add(DOMClasses.STEP_UNREACHABLE);
      nextStep.classList.remove(DOMClasses.STEP_COMPLETE);
      nextStep.querySelector(prestashop.selectors.checkout.stepTitle).classList.add('not-allowed');
    }
  };

  const enableAllBefore = (step) => {
    const prevSteps = getAllSiblingsBeforeElement(step);

    for (const prevStep of prevSteps) {
      prevStep.classList.remove(DOMClasses.STEP_UNREACHABLE);
      prevStep.classList.add(DOMClasses.STEP_COMPLETE);
      prevStep.querySelector(prestashop.selectors.checkout.stepTitle).classList.remove('not-allowed');
    }
  };

  const handleStepClick = (event) => {
    const clickedStep = event.target.closest(stepsSelector);

    if (!clickedStep) {
      return;
    }

    if (!isStepUnreachable(clickedStep) && !isStepCurrent(clickedStep)) {
      setCurrentStep(clickedStep);

      if (hasStepContinueButton(clickedStep)) {
        disableAllAfter(clickedStep);
      } else {
        enableAllBefore(clickedStep);
      }
    }
  };

  return {
    handleStepClick,
  };
};

export default useCheckoutStepsController;
