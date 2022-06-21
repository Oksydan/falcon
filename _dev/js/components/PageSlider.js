import $ from 'jquery';

import Swiper, {
  Navigation, Pagination, Thumbs, Autoplay, Lazy,
} from 'swiper';

export const modules = [Navigation, Pagination, Thumbs, Autoplay, Lazy];

export const SwiperSlider = Swiper;

class PageSlider {
  constructor({defaultOptions} = {}) {
    this.sliders = [];
    this.defaultOptions = defaultOptions;
    this.init();
  }

  init() {
    $('.swiper:not(.swiper-initialized)').not('.swiper-custom').each((i, el) => {
      this.addSlider(el);
    });
  }

  addSlider(el) {
    const $el = $(el);
    let elConfig = $el.data('swiper') || {};
    const $parent = $el.parent();
    const $nextEl = $parent.find('.swiper-button-next');
    const $prevEl = $parent.find('.swiper-button-prev');
    const $pagination = $parent.find('.swiper-pagination');

    if ($nextEl.length && $prevEl.length && typeof elConfig.navigation === 'undefined') {
      elConfig = {
        ...elConfig,
        modules,
        navigation: {
          nextEl: $nextEl[0],
          prevEl: $prevEl[0],
        },
      };
    }

    if ($pagination.length && typeof elConfig.pagination === 'undefined') {
      elConfig = {
        ...elConfig,
        modules,
        pagination: {
          el: $pagination[0],
          type: 'bullets',
          clickable: true,
        },
      };
    }

    this.sliders.push({
      el,
      config: this.mergeConfig(elConfig),
    });
  }

  mergeConfig(config) {
    return {
      ...this.defaultOptions,
      ...config,
    };
  }

  runSliders() {
    this.sliders.forEach((slider) => {
      /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "swiper" }] */
      const swiper = new Swiper(slider.el, slider.config);
    });

    this.sliders = [];
  }

  refresh() {
    this.init();
    this.runSliders();
  }
}

export default PageSlider;
