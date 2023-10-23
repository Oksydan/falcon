/**
 * A utility module for managing the page loader state.
 *
 * @module usePageLoader
 * @returns {Object} An object with methods to show and hide the page loader.
 * @property {Function} showLoader - Displays the page loader.
 * @property {Function} hideLoader - Hides the page loader.
 * @example
 * // Usage example:
 * const pageLoader = usePageLoader();
 * pageLoader.showLoader(); // Display the page loader
 * pageLoader.hideLoader(); // Hide the page loader
 */
const usePageLoader = () => {
  const { body } = document;
  const ACTIVE_CLASS = 'page-loader-active';

  /**
   * Show the page loader.
   *
   * @function
   * @name showLoader
   * @returns {void}
   */
  const showLoader = () => {
    body.classList.add(ACTIVE_CLASS);
  };

  /**
   * Hide the page loader.
   *
   * @function
   * @name hideLoader
   * @returns {void}
   */
  const hideLoader = () => {
    body.classList.remove(ACTIVE_CLASS);
  };

  return {
    showLoader,
    hideLoader,
  };
};

export default usePageLoader;
