/**
 * Refreshes the checkout page with an updated transaction parameter.
 *
 * @function
 * @returns {void}
 */
const refreshCheckoutPage = () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('updatedTransaction')) {
    window.location.reload();
    return;
  }

  urlParams.append('updatedTransaction', 1);
  window.location.href = `${window.location.pathname}?${urlParams.toString()}`;
};

export default refreshCheckoutPage;
