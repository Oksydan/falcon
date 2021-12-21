import $ from 'jquery';

import SwiperCore, {
  Swiper, Navigation, Pagination, Thumbs, Autoplay, Lazy
} from 'swiper';


SwiperCore.use([Navigation, Pagination, Thumbs, Autoplay, Lazy]);

export const SwiperSlider = Swiper;

class PageSlider {
  constructor({defaultOptions} = {}) {
    this.sliders = [];
    this.defaultOptions = defaultOptions;
    this.init();
  }

  init() {
    $('.swiper-container:not(.swiper-container-initialized)').not('.swiper-container-custom').each((i, el) => {
      this.addSlider(el);
    });
  }

  addSlider(el) {
    const $el = $(el);
    let elConfig = $el.data('swiper') || {};
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
