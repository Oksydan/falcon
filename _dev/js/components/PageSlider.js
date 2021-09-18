import $ from 'jquery';

import Swiper, {
  Navigation, Pagination, Thumbs, Autoplay,
} from 'swiper';

export {
  Swiper,
  Navigation,
  Pagination,
  Thumbs,
  Autoplay,
}

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
    let elConfig = $el.data('swiper');
    const $parent = $el.parent();
    const $nextEl = $parent.find('.swiper-button-next');
    const $prevEl = $parent.find('.swiper-button-prev');

    if ($nextEl.length && $prevEl.length && typeof elConfig.navigation === 'undefined') {
      elConfig = {
        ...elConfig,
        navigation: {
          nextEl: $nextEl[0],
          prevEl: $prevEl[0],
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
      ...{
        modules: [
          Navigation, Pagination, Thumbs, Autoplay
        ]
      }
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
