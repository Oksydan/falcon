/**
 * A utility module for managing the page loader state.
 *
 * @return {showLoader, hideLoader}
 * @example
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
   * @method showLoader
   * @returns {void}
   */
  const showLoader = () => {
    body.classList.add(ACTIVE_CLASS);
  };

  /**
   * Hide the page loader.
   *
   * @method hideLoader
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
