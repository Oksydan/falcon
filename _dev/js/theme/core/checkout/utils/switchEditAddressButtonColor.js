/**
 * Change the color of the edit button for the wrong address
 * @param {Boolean} enabled
 * @param {Number} id
 * @param {String} type
 */
const switchEditAddressButtonColor = (
  enabled,
  id,
  type,
) => {
  const addressBtns = document.querySelectorAll(`#id_address_${type}-address-${id} .js-edit-address`);
  const classesToToggle = ['text-danger'];

  document.querySelectorAll(`#${type}-addresses .js-edit-address`).forEach((button) => {
    button.classList.remove(...classesToToggle);
  });

  addressBtns.forEach((addressBtn) => {
    if (enabled) {
      addressBtn.classList.add(...classesToToggle);
    } else {
      addressBtn.classList.remove(...classesToToggle);
    }
  });
};

export default switchEditAddressButtonColor;
