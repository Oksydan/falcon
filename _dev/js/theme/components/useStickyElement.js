import debounce from '@js/theme/utils/debounce';

/**
 * Returns sticky element data
 * @param element
 * @returns {{getTop: ((function(): number)), getTopOffset: ((function(): number)), getFullTopOffset: (function(): number)}}
 */
export default (element, stickyWrapper, options = {}) => {
  if (!element) {
    throw new Error('Sticky element: element not found');
  }

  if (!stickyWrapper) {
    throw new Error('Sticky element: stickyWrapper not found');
  }

  const {
    extraOffsetTop = 0,
    debounceTime = 5,
    zIndex = 100,
  } = options;
  let isSticky = false;
  const getWrapperRect = () => {
    const wrapperRect = stickyWrapper.getBoundingClientRect();

    return {
      top: wrapperRect.top,
      bottom: wrapperRect.bottom,
      height: wrapperRect.height,
      width: wrapperRect.width,
    };
  };
  const getExtraOffsetTop = typeof extraOffsetTop === 'function' ? extraOffsetTop : () => extraOffsetTop;
  const setElementSticky = () => {
    const { height } = getWrapperRect();
    stickyWrapper.style.height = `${height}px`;
    element.style.top = `${getExtraOffsetTop()}px`;
    element.style.left = 0;
    element.style.right = 0;
    element.style.bottom = 'auto';
    element.style.position = 'fixed';
    element.style.zIndex = zIndex;
    element.classList.add('is-sticky');
    isSticky = true;
  };
  const unsetElementSticky = () => {
    element.style.top = null;
    element.style.bottom = null;
    element.style.position = null;
    element.style.zIndex = null;
    element.classList.remove('is-sticky');
    stickyWrapper.style.height = null;
    isSticky = false;
  };
  const getIsSticky = () => isSticky;
  const handleSticky = () => {
    const { top } = getWrapperRect();

    if (top <= getExtraOffsetTop()) {
      if (!isSticky) {
        setElementSticky();
      }
    } else if (isSticky) {
      unsetElementSticky();
    }
  };

  window.addEventListener('scroll', debounce(handleSticky, debounceTime));
  handleSticky();

  return {
    getExtraOffsetTop,
    getIsSticky,
  };
};
