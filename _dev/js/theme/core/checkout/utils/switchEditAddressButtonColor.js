import { each } from '../../../utils/DOMHelpers';

/**
 * Change the color of the edit button for the wrong address
 * @param {boolean} enabled - true if button should be dangered or false otherwise
 * @param {int} id - address id
 * @param {string} type - address type (delivery or invoice)
 */
const switchEditAddressButtonColor = (
  enabled,
  id,
  type,
) => {
  const classesToToggle = ['text-danger'];

  each(`#${type}-addresses .js-edit-address`, (button) => {
    button.classList.remove(...classesToToggle);
  });

  each(`#id_address_${type}-address-${id} .js-edit-address`, (addressBtn) => {
    if (enabled) {
      addressBtn.classList.add(...classesToToggle);
    } else {
      addressBtn.classList.remove(...classesToToggle);
    }
  });
};

export default switchEditAddressButtonColor;
