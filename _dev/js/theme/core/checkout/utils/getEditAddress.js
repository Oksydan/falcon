/**
 * Check if browser url contains editAddress parameter
 * @returns {string | null} editAddress parameter value or null if not found
 */
const getEditAddress = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.has('editAddress') ? urlParams.get('editAddress') : null;
};

export default getEditAddress;
