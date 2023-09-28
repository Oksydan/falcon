/**
 * Submit voucher code from link
 * @param event {object} - click event
 */
const codeLinkSubmitHandler = (event) => {
  event.preventDefault();

  const link = event.currentTarget;
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
