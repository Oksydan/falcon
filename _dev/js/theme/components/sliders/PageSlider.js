import SwiperSlider from '@js/theme/components/sliders/SwiperSlider';

class PageSlider {
  constructor() {
    this.observeElementClass = 'js-slider-observed';
    this.selfInitializedSlidersSelector = '.swiper:not(.swiper-custom)';
  }

  init() {
    const self = this;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(({ intersectionRatio, target }) => {
        if (intersectionRatio > 0) {
          self.observer.unobserve(target);
          PageSlider.initSlider(target);
        }
      });
    });

    this.observerElements();
  }

  static initSlider(target) {
    const swiper = new SwiperSlider(target, PageSlider.getConfigForSliderElement(target));
    swiper.initSlider();
  }

  static getConfigForSliderElement(target) {
    let elConfig = target.dataset.swiper || {};

    if (typeof elConfig === 'string') {
      elConfig = JSON.parse(elConfig);
    }

    const parent = target.parentElement;
    const nextEl = parent.querySelector('.swiper-button-next');
    const prevEl = parent.querySelector('.swiper-button-prev');
    const pagination = parent.querySelector('.swiper-pagination');

    if (nextEl && prevEl && typeof elConfig.navigation === 'undefined') {
      elConfig = {
        ...elConfig,
        navigation: {
          nextEl,
          prevEl,
        },
      };
    }

    if (pagination && typeof elConfig.pagination === 'undefined') {
      elConfig = {
        ...elConfig,
        pagination: {
          el: pagination,
          type: 'bullets',
          clickable: true,
        },
      };
    }

    return elConfig;
  }

  observerElements() {
    const elms = document.querySelectorAll(this.selfInitializedSlidersSelector);

    for (let i = 0; i < elms.length; i += 1) {
      const elem = elms[i];

      if (!elem.classList.contains(this.observeElementClass)) {
        this.observer.observe(elem);
        elem.classList.add(this.observeElementClass);
      }
    }
  }

  refresh() {
    this.observerElements();
  }
}

export default PageSlider;
