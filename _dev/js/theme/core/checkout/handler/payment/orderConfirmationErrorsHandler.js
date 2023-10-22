/**
 * Handles errors on order confirmation by redirecting to the cart page if needed.
 *
 * @function
 * @param {object} event - The event object containing the response information.
 * @param {object} event.resp - The response object.
 * @returns {void}
 */
const orderConfirmationErrorsHandler = ({ resp }) => {
  if (resp?.cartUrl !== '') {
    window.location.href = resp.cartUrl;
  }
};

export default orderConfirmationErrorsHandler;
