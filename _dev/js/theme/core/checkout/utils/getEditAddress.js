/**
 * Check if browser url contains editAddress parameter
 * @returns {string | null}
 */
const getEditAddress = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.has('editAddress') ? urlParams.get('editAddress') : null;
};

export default getEditAddress;
