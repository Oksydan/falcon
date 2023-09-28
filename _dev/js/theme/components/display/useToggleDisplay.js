const useToggleDisplay = () => {
  const D_NONE_CLASS = 'd-none';

  /**
    * Show element
    * @param element {HTMLElement} Element to show
    * @returns {void}
    */
  const show = (element) => {
    element.style.display = '';
    element.classList.remove(D_NONE_CLASS);
  };

  /**
    * Hide element
    * @param element {HTMLElement} Element to hide
    * @returns {void}
    */
  const hide = (element) => {
    element.style.display = '';
    element.classList.add(D_NONE_CLASS);
  };

  /**
    * Toggle element
    * @param element {HTMLElement} Element to toggle
    * @param display {boolean} Display or hide
    * @returns {void}
    */
  const toggle = (element, display) => {
    if (display) {
      show(element);
    } else {
      hide(element);
    }
  };

  return {
    show,
    hide,
    toggle,
  };
};

export default useToggleDisplay;
