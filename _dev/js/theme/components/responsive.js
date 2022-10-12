import $ from 'jquery';
import prestashop from 'prestashop';

const isMobile = () => prestashop.responsive.current_width < prestashop.responsive.min_width;

prestashop.responsive = prestashop.responsive || {};

prestashop.responsive.current_width = window.innerWidth;
prestashop.responsive.min_width = 768;
prestashop.responsive.mobile = isMobile();

function swapChildren(obj1, obj2) {
  const temp = obj2.children().detach();
  obj2.empty().append(obj1.children().detach());
  obj1.append(temp);
}

function toggleMobileStyles() {
  if (prestashop.responsive.mobile) {
    $("*[id^='_desktop_']").each((idx, el) => {
      const target = $(`#${el.id.replace('_desktop_', '_mobile_')}`);

      if (target.length) {
        swapChildren($(el), target);
      }
    });

    $('[data-collapse-hide-mobile]').collapse('hide');
  } else {
    $("*[id^='_mobile_']").each((idx, el) => {
      const target = $(`#${el.id.replace('_mobile_', '_desktop_')}`);

      if (target.length) {
        swapChildren($(el), target);
      }
    });

    $('[data-collapse-hide-mobile]').not('.show').collapse('show');
    $('[data-modal-hide-mobile].show').modal('hide');
  }
  prestashop.emit('responsive update', {
    mobile: prestashop.responsive.mobile,
  });
}

$(window).on('resize', () => {
  const { responsive } = prestashop;
  const cw = responsive.current_width;
  const mw = responsive.min_width;
  const w = window.innerWidth;
  const toggle = (cw >= mw && w < mw) || (cw < mw && w >= mw);
  responsive.current_width = w;
  responsive.mobile = responsive.current_width < responsive.min_width;
  if (toggle) {
    toggleMobileStyles();
  }
});

$(() => {
  if (prestashop.responsive.mobile) {
    toggleMobileStyles();
  }
});
