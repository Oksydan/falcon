import useEvent from './event/useEvent';

const useTopMenu = (selector) => {
  const { on, off } = useEvent();
  const menuElement = document.querySelector(selector);
  const DOM_SELECTORS = {
    SUB_ELEMENTS: '.main-menu__item--top',
    SUB_MENU: '.main-menu__sub',
  };
  const ITEM_ACTIVE = 'main-menu__item--active';


  const toggleSubMenu = (e) => {
    const { currentTarget } = e;
    const { SUB_MENU } = DOM_SELECTORS;
    const expanded = currentTarget.getAttribute('aria-expanded');
    const isExpanded = expanded && expanded.toLowerCase() === 'true';
    const subMenu = currentTarget.querySelector(SUB_MENU);

    currentTarget.classList.toggle(ITEM_ACTIVE);

    if (subMenu) {
      currentTarget.setAttribute('aria-expanded', !isExpanded);

      subMenu.setAttribute('aria-hidden', isExpanded);
      subMenu.setAttribute('aria-expanded', !isExpanded);

    }
  }

  const init = () => {
    debugger
    const { SUB_ELEMENTS } = DOM_SELECTORS;

    off(menuElement, 'mouseenter', SUB_ELEMENTS, toggleSubMenu);
    off(menuElement, 'mouseleave', SUB_ELEMENTS, toggleSubMenu);
    on(menuElement, 'mouseenter', SUB_ELEMENTS, toggleSubMenu);
    on(menuElement, 'mouseleave', SUB_ELEMENTS, toggleSubMenu);
  }

  return {
    init
  }
}

export default useTopMenu;
