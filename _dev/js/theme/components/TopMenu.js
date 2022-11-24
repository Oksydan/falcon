import $ from 'jquery';

export default class TopMenu {
  constructor(el) {
    this.$el = $(el);
  }

  init() {
    const self = this;
    self.$el.hoverIntent({
      over: self.toggleClassSubMenu,
      out: self.toggleClassSubMenu,
      selector: ' > li',
      timeout: 300,
    });
  }

  toggleClassSubMenu() {
    const $item = $(this);
    let expanded = $item.attr('aria-expanded');

    if (typeof expanded !== 'undefined') {
      expanded = expanded.toLowerCase() === 'true';
      $item.toggleClass('main-menu__item--active').attr('aria-expanded', !expanded);
      $('.main-menu__sub', $item)
        .attr('aria-expanded', !expanded)
        .attr('aria-hidden', expanded);
    }
  }
}
