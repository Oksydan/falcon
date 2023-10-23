import prestashop from 'prestashop';
import { getAllSiblingsBeforeElement, getAllSiblingsAfterElement } from '../../../../utils/DOM/DOMSelectorsHelper';

/**
 * A utility function to control checkout steps in Prestashop.
 *
 * @module useCheckoutStepsController
 * @param {string} stepsSelector - The selector for identifying checkout steps. Defaults to Prestashop's default selector.
 * @returns {object} An object with functions for controlling checkout steps.
 */
const useCheckoutStepsController = (stepsSelector = prestashop.selectors.checkout.step) => {
  const DOMClasses = {
    STEP_CURRENT: '-current',
    STEP_REACHABLE: '-reachable',
    STEP_COMPLETE: '-complete',
    STEP_CLICKABLE: '-clickable',
    STEP_UNREACHABLE: '-unreachable',
  };

  /**
   * Checks if a step is the current step.
   *
   * @function
   * @param {HTMLElement} step - The step element to check.
   * @returns {boolean} True if the step is the current step, false otherwise.
   */
  const isStepCurrent = (step) => step.classList.contains(DOMClasses.STEP_CURRENT);

  /**
   * Checks if a step is unreachable.
   *
   * @function
   * @param {HTMLElement} step - The step element to check.
   * @returns {boolean} True if the step is unreachable, false otherwise.
   */
  const isStepUnreachable = (step) => step.classList.contains(DOMClasses.STEP_UNREACHABLE);

  /**
   * Checks if a step has a continue button.
   *
   * @function
   * @param {HTMLElement} step - The step element to check.
   * @returns {boolean} True if the step has a continue button, false otherwise.
   */
  const hasStepContinueButton = (step) => step.querySelector('button.continue') !== null;

  /**
   * Gets the current step.
   *
   * @function
   * @returns {HTMLElement|null} The current step element, or null if not found.
   */
  const getCurrentStep = () => document.querySelector(`${stepsSelector}.${DOMClasses.STEP_CURRENT}`);

  /**
   * Sets a step as the current step.
   *
   * @function
   * @param {HTMLElement} step - The step element to set as current.
   */
  const setCurrentStep = (step) => {
    getCurrentStep()?.classList.remove(DOMClasses.STEP_CURRENT);
    step.classList.add(DOMClasses.STEP_CURRENT);
  };

  /**
   * Disables all steps after the provided step.
   *
   * @function
   * @param {HTMLElement} step - The step after which all steps should be disabled.
   */
  const disableAllAfter = (step) => {
    const nextSteps = getAllSiblingsAfterElement(step);

    for (const nextStep of nextSteps) {
      nextStep.classList.add(DOMClasses.STEP_UNREACHABLE);
      nextStep.classList.remove(DOMClasses.STEP_COMPLETE, DOMClasses.STEP_REACHABLE);
      nextStep.querySelector(prestashop.selectors.checkout.stepTitle).classList.add('not-allowed');
    }
  };

  /**
   * Enables all steps before the provided step.
   *
   * @function
   * @param {HTMLElement} step - The step before which all steps should be enabled.
   */
  const enableAllBefore = (step) => {
    const prevSteps = getAllSiblingsBeforeElement(step);

    for (const prevStep of prevSteps) {
      prevStep.classList.remove(DOMClasses.STEP_UNREACHABLE);
      prevStep.classList.add(DOMClasses.STEP_COMPLETE);
      prevStep.querySelector(prestashop.selectors.checkout.stepTitle).classList.remove('not-allowed');
    }
  };

  /**
   * Changes the current step and adjusts the reachable and unreachable steps accordingly.
   *
   * @function
   * @param {HTMLElement} step - The step to change to.
   */
  const changeStep = (step) => {
    if (!step) {
      return;
    }

    if (!isStepUnreachable(step) && !isStepCurrent(step)) {
      setCurrentStep(step);

      if (hasStepContinueButton(step)) {
        disableAllAfter(step);
      } else {
        enableAllBefore(step);
      }
    }
  };

  return {
    changeStep,
    stepsSelector,
  };
};

export default useCheckoutStepsController;
