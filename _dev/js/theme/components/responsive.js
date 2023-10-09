import prestashop from 'prestashop';
import DOMReady from '../utils/DOMReady';

function isMobile() {
  return prestashop.responsive.current_width < prestashop.responsive.min_width;
}

prestashop.responsive = {};
prestashop.responsive.current_width = window.innerWidth;
prestashop.responsive.min_width = 768;
prestashop.responsive.mobile = isMobile();

function swapChildren(obj1, obj2) {
  const temp = Array.from(obj2.children).map((child) => child.cloneNode(true));
  obj2.innerHTML = '';
  temp.forEach((child) => obj2.appendChild(child));

  const childrenObj1 = Array.from(obj1.children);
  childrenObj1.forEach((child) => obj1.removeChild(child));
  childrenObj1.forEach((child) => obj2.appendChild(child));
}

function toggleMobileStyles() {
  if (prestashop.responsive.mobile) {
    document.querySelectorAll('*[id^="_desktop_"]').forEach((el) => {
      const target = document.getElementById(el.id.replace('_desktop_', '_mobile_'));

      if (target) {
        swapChildren(el, target);
      }
    });

    document.querySelectorAll('[data-collapse-hide-mobile]').forEach((el) => el.classList.add('collapse'));
  } else {
    document.querySelectorAll('*[id^="_mobile_"]').forEach((el) => {
      const target = document.getElementById(el.id.replace('_mobile_', '_desktop_'));

      if (target) {
        swapChildren(el, target);
      }
    });

    document.querySelectorAll('[data-collapse-hide-mobile]:not(.show)').forEach((el) => el.classList.remove('collapse'));
    document.querySelectorAll('[data-modal-hide-mobile].show').forEach((el) => el.classList.remove('show'));
  }
  prestashop.emit('responsive update', {
    mobile: prestashop.responsive.mobile,
  });
}

const handleResize = () => {
  const cw = prestashop.responsive.current_width;
  const mw = prestashop.responsive.min_width;
  const w = window.innerWidth;
  const toggle = (cw >= mw && w < mw) || (cw < mw && w >= mw);
  prestashop.responsive.current_width = w;
  prestashop.responsive.mobile = prestashop.responsive.current_width < prestashop.responsive.min_width;
  if (toggle) {
    toggleMobileStyles();
  }
};

window.addEventListener('resize', handleResize);

DOMReady(() => {
  if (prestashop.responsive.mobile) {
    toggleMobileStyles();
  }
});
