/**
 * Check if the product is in preview mode
 * @returns {boolean}
 */
const isProductPreview = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.has('preview');
};

export default isProductPreview;
