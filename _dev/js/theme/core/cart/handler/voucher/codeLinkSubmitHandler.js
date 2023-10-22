/**
 * Handles the submission of a voucher code from a link.
 * @param {Event} event - The click event that triggered the submission.
 * @param {HTMLElement} event.delegateTarget - The target element that was clicked.
 * @throws {Error} Will throw an error if the required elements are not found.
 * @returns {void}
 */
const codeLinkSubmitHandler = (event) => {
  event.preventDefault();

  const link = event.delegateTarget;
  const input = document.querySelector('[name="discount_name"]');
  const form = document.querySelector('.js-voucher-form');
  const code = link.dataset?.code;

  if (input && form && code) {
    const formEvent = new Event('submit', {
      bubbles: true,
      cancelable: true,
    });

    input.value = code;
    form.dispatchEvent(formEvent);
  }
};

export default codeLinkSubmitHandler;
