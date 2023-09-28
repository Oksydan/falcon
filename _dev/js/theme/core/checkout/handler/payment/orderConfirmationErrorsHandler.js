/**
 * Redirect to cart page if there are errors on order confirmation
 * @param event {object} - event object
 */
const orderConfirmationErrorsHandler = ({ resp }) => {
  if (resp?.cartUrl !== '') {
    window.location.href = resp.cartUrl;
  }
};

export default orderConfirmationErrorsHandler;
