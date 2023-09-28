import prestashop from 'prestashop';
import { each } from '../../../utils/DOMHelpers';

/**
 * Check if all conditions are accepted
 * @returns {boolean} true if all conditions are accepted or false otherwise
 */
const areConditionsAccepted = () => {
  let accepted = true;
  const { conditionsSelector } = prestashop.selectors.checkout;
  const conditions = document.querySelectorAll(`${conditionsSelector} input[type="checkbox"]`);

  each(conditions, (condition) => {
    if (!condition.checked) {
      accepted = false;
    }
  });

  return accepted;
};

export default areConditionsAccepted;
