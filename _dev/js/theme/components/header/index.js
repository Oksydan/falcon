import { DOMReady } from '../../../utils/DOM/DOMHelpers';
import useStickyElement from '../useStickyElement';

const initStickyHeader = () => {
  const header = document.querySelector('.js-header-top');
  const headerWrapper = document.querySelector('.js-header-top-wrapper');

  if (header && headerWrapper) {
    const { init } = useStickyElement(header, headerWrapper);

    init();
  }
};

DOMReady(() => {
  initStickyHeader();
});
