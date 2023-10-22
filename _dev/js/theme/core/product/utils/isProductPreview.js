/**
 * Checks if the product is in preview mode.
 *
 * @function
 * @returns {boolean} - True if the product is in preview mode, otherwise false.
 */
const isProductPreview = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('preview');
};

export default isProductPreview;
