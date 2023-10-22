/**
 * Checks if the browser URL contains the 'editAddress' parameter.
 *
 * @function
 * @returns {string | null} The value of the 'editAddress' parameter, or null if not found.
 */
const getEditAddress = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.has('editAddress') ? urlParams.get('editAddress') : null;
};

export default getEditAddress;
