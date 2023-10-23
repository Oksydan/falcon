import { each } from '../../../../utils/DOM/DOMHelpers';

/**
 * Changes the color of the edit button for the wrong address.
 *
 * @function
 * @param {boolean} enabled - `true` if the button should be dangered, `false` otherwise.
 * @param {number} id - Address ID.
 * @param {string} type - Address type (`delivery` or `invoice`).
 * @returns {void}
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
